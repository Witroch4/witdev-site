import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const site = searchParams.get('site') || null;
    const period = searchParams.get('period') || '7d';

    const periodMap: Record<string, string> = {
        '24h': '1 day', '7d': '7 days', '30d': '30 days', '90d': '90 days',
    };
    const interval = periodMap[period] || '7 days';

    const siteFilter = site ? 'AND site_id = $2' : '';
    const params: unknown[] = [interval];
    if (site) params.push(site);

    try {
        // Localizações agrupadas por cidade
        const locations = await query(
            `SELECT country, region, city, latitude, longitude,
              COUNT(*) as views,
              COUNT(DISTINCT visitor_id) as visitors
       FROM analytics.page_views 
       WHERE event_type = 'pageview' 
         AND created_at >= NOW() - $1::interval 
         AND city IS NOT NULL
         ${siteFilter}
       GROUP BY country, region, city, latitude, longitude 
       ORDER BY views DESC 
       LIMIT 100`,
            params
        );

        // Top países
        const countries = await query(
            `SELECT country, COUNT(*) as views, COUNT(DISTINCT visitor_id) as visitors
       FROM analytics.page_views 
       WHERE event_type = 'pageview' 
         AND created_at >= NOW() - $1::interval 
         AND country IS NOT NULL
         ${siteFilter}
       GROUP BY country ORDER BY views DESC LIMIT 20`,
            params
        );

        // Top estados (Brasil)
        const regions = await query(
            `SELECT region, COUNT(*) as views, COUNT(DISTINCT visitor_id) as visitors
       FROM analytics.page_views 
       WHERE event_type = 'pageview' 
         AND created_at >= NOW() - $1::interval 
         AND region IS NOT NULL
         ${siteFilter}
       GROUP BY region ORDER BY views DESC LIMIT 20`,
            params
        );

        return NextResponse.json({
            locations: locations.rows,
            countries: countries.rows,
            regions: regions.rows,
        });
    } catch (error) {
        console.error('[Locations] Error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
