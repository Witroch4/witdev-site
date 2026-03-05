import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const site = searchParams.get('site') || null; // null = todos os sites
    const period = searchParams.get('period') || '7d';

    // Calcular data de início baseado no período
    const periodMap: Record<string, string> = {
        '24h': '1 day',
        '7d': '7 days',
        '30d': '30 days',
        '90d': '90 days',
    };
    const interval = periodMap[period] || '7 days';

    const siteFilter = site ? 'AND site_id = $2' : '';
    const params: unknown[] = [interval];
    if (site) params.push(site);

    try {
        // 1. Total de page views
        const totalViews = await query(
            `SELECT COUNT(*) as total FROM analytics.page_views 
       WHERE event_type = 'pageview' AND created_at >= NOW() - $1::interval ${siteFilter}`,
            params
        );

        // 2. Visitantes únicos
        const uniqueVisitors = await query(
            `SELECT COUNT(DISTINCT visitor_id) as total FROM analytics.page_views 
       WHERE event_type = 'pageview' AND created_at >= NOW() - $1::interval ${siteFilter}`,
            params
        );

        // 3. Sessões
        const sessions = await query(
            `SELECT COUNT(DISTINCT session_id) as total FROM analytics.page_views 
       WHERE event_type = 'pageview' AND created_at >= NOW() - $1::interval ${siteFilter}`,
            params
        );

        // 4. Tempo médio na página (baseado nos eventos 'leave')
        const avgDuration = await query(
            `SELECT COALESCE(AVG(duration_ms), 0)::int as avg_ms FROM analytics.page_views 
       WHERE event_type = 'leave' AND duration_ms > 0 AND created_at >= NOW() - $1::interval ${siteFilter}`,
            params
        );

        // 5. Top páginas
        const topPages = await query(
            `SELECT path, COUNT(*) as views, COUNT(DISTINCT visitor_id) as visitors
       FROM analytics.page_views 
       WHERE event_type = 'pageview' AND created_at >= NOW() - $1::interval ${siteFilter}
       GROUP BY path ORDER BY views DESC LIMIT 10`,
            params
        );

        // 6. Visitas por dia (gráfico)
        const dailyViews = await query(
            `SELECT DATE(created_at) as date, 
              COUNT(*) as views,
              COUNT(DISTINCT visitor_id) as visitors
       FROM analytics.page_views 
       WHERE event_type = 'pageview' AND created_at >= NOW() - $1::interval ${siteFilter}
       GROUP BY DATE(created_at) ORDER BY date`,
            params
        );

        // 7. Top referrers
        const topReferrers = await query(
            `SELECT COALESCE(referrer, 'Direto') as referrer, COUNT(*) as views
       FROM analytics.page_views 
       WHERE event_type = 'pageview' AND created_at >= NOW() - $1::interval ${siteFilter}
       GROUP BY referrer ORDER BY views DESC LIMIT 10`,
            params
        );

        // 8. Visitas por site
        const bySite = await query(
            `SELECT site_id, COUNT(*) as views, COUNT(DISTINCT visitor_id) as visitors
       FROM analytics.page_views 
       WHERE event_type = 'pageview' AND created_at >= NOW() - $1::interval
       GROUP BY site_id ORDER BY views DESC`,
            [interval]
        );

        return NextResponse.json({
            overview: {
                totalViews: parseInt(totalViews.rows[0]?.total || '0'),
                uniqueVisitors: parseInt(uniqueVisitors.rows[0]?.total || '0'),
                sessions: parseInt(sessions.rows[0]?.total || '0'),
                avgDurationMs: parseInt(avgDuration.rows[0]?.avg_ms || '0'),
            },
            topPages: topPages.rows,
            dailyViews: dailyViews.rows,
            topReferrers: topReferrers.rows,
            bySite: bySite.rows,
        });
    } catch (error) {
        console.error('[Stats] Error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
