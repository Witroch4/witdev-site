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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = (page - 1) * limit;

    const periodMap: Record<string, string> = {
        '24h': '1 day', '7d': '7 days', '30d': '30 days', '90d': '90 days',
    };
    const interval = periodMap[period] || '7 days';

    const siteFilter = site ? 'AND site_id = $2' : '';
    const params: unknown[] = [interval];
    if (site) params.push(site);

    try {
        // Eventos (cliques, scroll, etc.) - excluir pageview e leave
        const events = await query(
            `SELECT id, site_id, path, event_type, event_data, 
              ip_address::text, city, country, created_at
       FROM analytics.page_views 
       WHERE event_type NOT IN ('pageview', 'leave')
         AND created_at >= NOW() - $1::interval 
         ${siteFilter}
       ORDER BY created_at DESC 
       LIMIT ${limit} OFFSET ${offset}`,
            params
        );

        // Total para paginação
        const total = await query(
            `SELECT COUNT(*) as total FROM analytics.page_views 
       WHERE event_type NOT IN ('pageview', 'leave')
         AND created_at >= NOW() - $1::interval 
         ${siteFilter}`,
            params
        );

        // Top eventos
        const topEvents = await query(
            `SELECT event_type, 
              event_data->>'element' as element,
              COUNT(*) as count
       FROM analytics.page_views 
       WHERE event_type NOT IN ('pageview', 'leave')
         AND created_at >= NOW() - $1::interval 
         ${siteFilter}
       GROUP BY event_type, event_data->>'element'
       ORDER BY count DESC LIMIT 20`,
            params
        );

        return NextResponse.json({
            events: events.rows,
            total: parseInt(total.rows[0]?.total || '0'),
            page,
            limit,
            topEvents: topEvents.rows,
        });
    } catch (error) {
        console.error('[Events] Error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
