import { Pool } from 'pg';

// Singleton pool para reutilização de conexões
let pool: Pool | null = null;

export function getPool(): Pool {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL || 'postgresql://witdev_analytics:witdev_analytics_2026@witdev_postgres:5432/witdev_analytics',
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
        });

        pool.on('error', (err) => {
            console.error('[DB] Pool error:', err.message);
        });
    }
    return pool;
}

export async function query(text: string, params?: unknown[]) {
    const client = await getPool().connect();
    try {
        const result = await client.query(text, params);
        return result;
    } finally {
        client.release();
    }
}

export async function initDatabase() {
    const db = getPool();

    // Create schema
    await db.query(`CREATE SCHEMA IF NOT EXISTS analytics`);

    // Page views table
    await db.query(`
    CREATE TABLE IF NOT EXISTS analytics.page_views (
      id            BIGSERIAL PRIMARY KEY,
      site_id       VARCHAR(50) NOT NULL,
      session_id    VARCHAR(64) NOT NULL,
      visitor_id    VARCHAR(64) NOT NULL,
      path          VARCHAR(500) NOT NULL,
      referrer      VARCHAR(500),
      user_agent    VARCHAR(500),
      ip_address    INET,
      country       VARCHAR(100),
      region        VARCHAR(100),
      city          VARCHAR(100),
      latitude      DECIMAL(9,6),
      longitude     DECIMAL(9,6),
      event_type    VARCHAR(50) DEFAULT 'pageview',
      event_data    JSONB,
      duration_ms   INTEGER DEFAULT 0,
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `);

    // Indexes for common queries
    await db.query(`CREATE INDEX IF NOT EXISTS idx_pv_site_id ON analytics.page_views(site_id)`);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_pv_created_at ON analytics.page_views(created_at)`);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_pv_visitor_id ON analytics.page_views(visitor_id)`);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_pv_event_type ON analytics.page_views(event_type)`);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_pv_site_created ON analytics.page_views(site_id, created_at)`);

    // Admins table
    await db.query(`
    CREATE TABLE IF NOT EXISTS analytics.admins (
      id            SERIAL PRIMARY KEY,
      email         VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name          VARCHAR(255),
      role          VARCHAR(20) DEFAULT 'viewer',
      created_at    TIMESTAMPTZ DEFAULT NOW(),
      last_login    TIMESTAMPTZ
    )
  `);

    console.log('[DB] Analytics schema initialized');
}
