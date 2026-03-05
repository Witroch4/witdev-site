import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { query } from './db';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'witdev-admin-secret-change-in-production-2026'
);

const COOKIE_NAME = 'witdev_admin_token';

export interface AdminUser {
    id: number;
    email: string;
    name: string | null;
    role: string;
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export async function createToken(user: AdminUser): Promise<string> {
    return new SignJWT({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AdminUser | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return {
            id: payload.id as number,
            email: payload.email as string,
            name: payload.name as string | null,
            role: payload.role as string,
        };
    } catch {
        return null;
    }
}

export async function getCurrentUser(): Promise<AdminUser | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

export async function setAuthCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function findAdminByEmail(email: string) {
    const result = await query(
        'SELECT id, email, name, role, password_hash FROM analytics.admins WHERE email = $1',
        [email]
    );
    return result.rows[0] || null;
}

export async function createAdmin(email: string, password: string, name: string, role = 'admin') {
    const hash = await hashPassword(password);
    const result = await query(
        'INSERT INTO analytics.admins (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
        [email, hash, name, role]
    );
    return result.rows[0];
}

export async function updateLastLogin(adminId: number) {
    await query('UPDATE analytics.admins SET last_login = NOW() WHERE id = $1', [adminId]);
}
