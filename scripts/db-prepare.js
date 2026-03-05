const { Pool } = require('pg');

async function main() {
    console.log('🔄 Iniciando db-prepare...');

    // Configura a connection string baseado no log/ambiente do compose
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('❌ DATABASE_URL não definida.');
        process.exit(1);
    }

    // Tentar conectar de forma mais bruta em caso de estar rodando migrations do Next
    const pool = new Pool({
        connectionString,
        ssl: process.env.NODE_ENV === 'production' && !connectionString.includes('localhost') ? { rejectUnauthorized: false } : false
    });

    try {
        const client = await pool.connect();
        console.log('✅ Conectado ao PostgreSQL com sucesso!');

        // Tentar criar o schema e as tabelas básicas se não existirem
        await client.query(`
      CREATE SCHEMA IF NOT EXISTS analytics;

      CREATE TABLE IF NOT EXISTS analytics.page_views (
        id SERIAL PRIMARY KEY,
        site VARCHAR(100) NOT NULL,
        visitor_id VARCHAR(100) NOT NULL,
        session_id VARCHAR(100) NOT NULL,
        path VARCHAR(255) NOT NULL,
        referrer TEXT,
        country VARCHAR(2),
        region VARCHAR(100),
        city VARCHAR(100),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        ip_hash VARCHAR(64) NOT NULL,
        user_agent TEXT,
        duration INTEGER DEFAULT 0,
        events JSONB DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_page_views_site ON analytics.page_views(site);
      CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON analytics.page_views(visitor_id);
      CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON analytics.page_views(created_at);

      CREATE TABLE IF NOT EXISTS analytics.admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      console.log('✅ Estrutura de tabelas e schema analítico (analytics) inicializada.');
      
      // Auto-injetar admin apenas SE a tabela de admins estiver completamente vazia? A API de login faz isso para witdev@hotmail.com 
      // Não precisamos duplicar comportamento.

    `);

        console.log('✅ Banco validado com sucesso!');
        client.release();
    } catch (err) {
        console.error('❌ Erro de conexão ou migração no DB:', err);
        process.exit(1);
    } finally {
        await pool.end();
    }

    console.log('✨ db-prepare concluído.');
}

main().catch(err => {
    console.error('Unhandled error in db-prepare:', err);
    process.exit(1);
});
