import { NextRequest, NextResponse } from 'next/server';
import { findAdminByEmail, verifyPassword, createToken, setAuthCookie, updateLastLogin, createAdmin } from '@/lib/auth';
import { initDatabase } from '@/lib/db';

let dbReady = false;

export async function POST(request: NextRequest) {
    try {
        if (!dbReady) {
            await initDatabase();
            dbReady = true;
        }

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
        }

        let admin = await findAdminByEmail(email);

        // Se não existe nenhum admin e é o email root, cria o primeiro admin
        if (!admin && email === 'witalo_rocha@hotmail.com') {
            admin = await createAdmin(email, password, 'Witalo Rocha', 'admin');
            admin = await findAdminByEmail(email);
        }

        if (!admin) {
            return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
        }

        const validPassword = await verifyPassword(password, admin.password_hash);
        if (!validPassword) {
            return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
        }

        const token = await createToken({
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
        });

        await setAuthCookie(token);
        await updateLastLogin(admin.id);

        return NextResponse.json({
            user: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('[Auth] Login error:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
