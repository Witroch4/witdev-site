import { NextRequest, NextResponse } from 'next/server';
import { query, initDatabase } from '@/lib/db';
import { getGeoFromIP } from '@/lib/geo';

// Flag para inicializar o banco apenas uma vez
let dbInitialized = false;

export async function POST(request: NextRequest) {
    try {
        // Init DB on first request
        if (!dbInitialized) {
            await initDatabase();
            dbInitialized = true;
        }

        const body = await request.json();

        // Validação básica
        if (!body.site || !body.path || !body.type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Extrair IP real (Traefik envia via X-Forwarded-For)
        const forwarded = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        const ip = forwarded?.split(',')[0]?.trim() || realIp || '127.0.0.1';

        // Geolocalizão do IP (async, com cache)
        const geo = await getGeoFromIP(ip);

        // Preparar event_data
        const eventData = body.data ? JSON.stringify(body.data) : null;

        // Salvar no banco
        await query(
            `INSERT INTO analytics.page_views 
        (site_id, session_id, visitor_id, path, referrer, user_agent, ip_address, 
         country, region, city, latitude, longitude, 
         event_type, event_data, duration_ms)
       VALUES ($1, $2, $3, $4, $5, $6, $7::inet, $8, $9, $10, $11, $12, $13, $14::jsonb, $15)`,
            [
                body.site,
                body.session || 'unknown',
                body.visitor || 'unknown',
                body.path.slice(0, 500),
                body.referrer?.slice(0, 500) || null,
                request.headers.get('user-agent')?.slice(0, 500) || null,
                ip,
                geo.country,
                geo.region,
                geo.city,
                geo.latitude,
                geo.longitude,
                body.type,
                eventData,
                body.duration || 0,
            ]
        );

        // Resposta mínima para performance
        return new NextResponse(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    } catch (error) {
        console.error('[Track] Error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}

// CORS preflight
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
