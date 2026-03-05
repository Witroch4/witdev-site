interface GeoData {
    country: string | null;
    region: string | null;
    city: string | null;
    latitude: number | null;
    longitude: number | null;
}

// Cache em memória para evitar chamadas repetidas
const geoCache = new Map<string, { data: GeoData; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 horas

/**
 * Resolve IP para localização geográfica usando ip-api.com (gratuito, 45 req/min)
 */
export async function getGeoFromIP(ip: string): Promise<GeoData> {
    const empty: GeoData = { country: null, region: null, city: null, latitude: null, longitude: null };

    // IPs locais / privados
    if (!ip || ip === '::1' || ip === '127.0.0.1' || ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('172.')) {
        return { ...empty, country: 'Local', city: 'Localhost' };
    }

    // Check cache
    const cached = geoCache.get(ip);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,lat,lon`, {
            signal: AbortSignal.timeout(3000),
        });

        if (!response.ok) return empty;

        const data = await response.json();

        if (data.status !== 'success') return empty;

        const geo: GeoData = {
            country: data.country || null,
            region: data.regionName || null,
            city: data.city || null,
            latitude: data.lat || null,
            longitude: data.lon || null,
        };

        // Cachear resultado
        geoCache.set(ip, { data: geo, timestamp: Date.now() });

        // Limpar cache se ficar muito grande
        if (geoCache.size > 10000) {
            const entries = [...geoCache.entries()];
            entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
            for (let i = 0; i < 5000; i++) {
                geoCache.delete(entries[i][0]);
            }
        }

        return geo;
    } catch (error) {
        console.error('[GEO] Error resolving IP:', ip, error);
        return empty;
    }
}
