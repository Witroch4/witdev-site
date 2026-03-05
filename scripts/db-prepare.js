#!/usr/bin/env node
/* eslint-disable no-console */
"use strict";

const { Pool } = require('pg');

function parseDbUrl(raw) {
    const url = new URL(raw);
    const params = url.search || "";
    return {
        host: url.hostname,
        port: url.port || "5432",
        user: decodeURIComponent(url.username || ""),
        pass: decodeURIComponent(url.password || ""),
        db: (url.pathname || "").replace(/^\//, ""),
        adminUrl: `postgresql://${encodeURIComponent(url.username || "")}:${encodeURIComponent(url.password || "")}@${url.hostname}:${url.port || "5432"}/postgres${params}`
    };
}

async function ensureDatabaseExists() {
    const url = process.env.DATABASE_URL;
    if (!url) {
        console.error('❌ DATABASE_URL não definida.');
        process.exit(1);
    }

    const { adminUrl, db } = parseDbUrl(url);

    const adminPool = new Pool({
        connectionString: adminUrl,
        ssl: process.env.NODE_ENV === 'production' && !adminUrl.includes('localhost') && !adminUrl.includes('49.13.155.94') ? { rejectUnauthorized: false } : false
    });

    try {
        console.log(`� Conectando ao host para checar/criar banco '${db}'...`);
        const adminClient = await adminPool.connect();

        const res = await adminClient.query('SELECT datname FROM pg_catalog.pg_database WHERE datname = $1', [db]);
        if (res.rowCount === 0) {
            console.log(`📝 Database '${db}' não existe. Criando...`);
            // O PG Driver precisa criar database cru, sem prepared statements com $, por isso a raw string
            await adminClient.query(`CREATE DATABASE "${db}"`);
            console.log(`✅ Database '${db}' criado.`);
        } else {
            console.log(`✅ Database '${db}' já existe.`);
        }

        adminClient.release();
    } catch (err) {
        if (err.code === "42P04" || /already exists/i.test(err.message)) {
            console.log(`✅ Database '${db}' já existe (concorrência).`);
        } else {
            console.error('❌ Erro na fase de garantir database:', err.message);
            throw err;
        }
    } finally {
        await adminPool.end();
    }
}

async function runSchemas() {
    const url = process.env.DATABASE_URL;
    const pool = new Pool({
        connectionString: url,
        ssl: process.env.NODE_ENV === 'production' && !url.includes('localhost') && !url.includes('49.13.155.94') ? { rejectUnauthorized: false } : false
    });

    try {
        const client = await pool.connect();
        console.log('✅ Conectado ao banco de analytics principal. Verificando tabelas (schemas)...');

        // Tentar criar o schema e as tabelas básicas se não existirem
        await client.query(`
      CREATE SCHEMA IF NOT EXISTS analytics;

      CREATE TABLE IF NOT EXISTS analytics.page_views (
        id BIGSERIAL PRIMARY KEY,
        site_id VARCHAR(50) NOT NULL,
        session_id VARCHAR(64) NOT NULL,
        visitor_id VARCHAR(64) NOT NULL,
        path VARCHAR(500) NOT NULL,
        referrer VARCHAR(500),
        user_agent VARCHAR(500),
        ip_address INET,
        country VARCHAR(100),
        region VARCHAR(100),
        city VARCHAR(100),
        latitude DECIMAL(9,6),
        longitude DECIMAL(9,6),
        event_type VARCHAR(50) DEFAULT 'pageview',
        event_data JSONB,
        duration_ms INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_pv_site_id ON analytics.page_views(site_id);
      CREATE INDEX IF NOT EXISTS idx_pv_created_at ON analytics.page_views(created_at);
      CREATE INDEX IF NOT EXISTS idx_pv_visitor_id ON analytics.page_views(visitor_id);
      CREATE INDEX IF NOT EXISTS idx_pv_event_type ON analytics.page_views(event_type);
      CREATE INDEX IF NOT EXISTS idx_pv_site_created ON analytics.page_views(site_id, created_at);

      CREATE TABLE IF NOT EXISTS analytics.admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(20) DEFAULT 'viewer',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        last_login TIMESTAMPTZ
      );
    `);

        console.log('✅ Estrutura de tabelas e schema analítico (analytics) inicializada e garantida!');

        client.release();
    } catch (err) {
        console.error('❌ Erro de migração/criação das tabelas no DB:', err);
        throw err;
    } finally {
        await pool.end();
    }
}

async function main() {
    console.log('🔄 Iniciando db-prepare...');

    try {
        await ensureDatabaseExists();
        await runSchemas();
        console.log('✨ db-prepare concluído sem erros.');
    } catch (e) {
        console.error("💥 Erro fatal no db-prepare:", e);
        process.exit(1);
    }
}

main();
