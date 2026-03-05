'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    MapPin,
    MousePointerClick,
    LogOut,
    Menu,
    X,
    Clock,
    FileText,
    ChevronDown,
} from 'lucide-react';

interface AdminUser {
    id: number;
    email: string;
    name: string | null;
    role: string;
}

const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/mapa', icon: MapPin, label: 'Localização' },
    { href: '/admin/eventos', icon: MousePointerClick, label: 'Eventos' },
    // TODOs:
    { href: '/admin/tempo-real', icon: Clock, label: 'Tempo Real', todo: true },
    { href: '/admin/logs', icon: FileText, label: 'Logs', todo: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Se está na página de login, não precisa de auth
    const isLoginPage = pathname === '/admin/login';

    const checkAuth = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else if (!isLoginPage) {
                router.push('/admin/login');
            }
        } catch {
            if (!isLoginPage) router.push('/admin/login');
        } finally {
            setLoading(false);
        }
    }, [isLoginPage, router]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    async function handleLogout() {
        await fetch('/api/admin/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    }

    // Página de login - render direto sem layout
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Não autenticado
    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-zinc-900/30 border-r border-zinc-800/50 fixed h-full">
                {/* Logo */}
                <div className="p-6 border-b border-zinc-800/50">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-white">WitDev</div>
                            <div className="text-xs text-zinc-500">Admin Panel</div>
                        </div>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.todo ? '#' : item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive
                                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        : item.todo
                                            ? 'text-zinc-600 cursor-not-allowed'
                                            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                                    }`}
                                onClick={(e) => item.todo && e.preventDefault()}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                                {item.todo && (
                                    <span className="ml-auto text-[10px] bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-500">TODO</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-zinc-800/50">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-sm font-bold">
                            {(user.name || user.email)[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{user.name || user.email}</div>
                            <div className="text-xs text-zinc-500">{user.role}</div>
                        </div>
                        <button onClick={handleLogout} className="text-zinc-500 hover:text-red-400 transition">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                            <LayoutDashboard className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold">WitDev</span>
                    </div>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-zinc-400">
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 z-40 bg-black/50"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            className="w-64 bg-zinc-900 h-full p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <nav className="space-y-1 mt-4">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.todo ? '#' : item.href}
                                            onClick={(e) => {
                                                if (item.todo) e.preventDefault();
                                                else setSidebarOpen(false);
                                            }}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                        ${isActive ? 'bg-blue-500/10 text-blue-400' : item.todo ? 'text-zinc-600' : 'text-zinc-400 hover:bg-zinc-800/50'}`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                            <button onClick={handleLogout} className="mt-8 flex items-center gap-3 px-4 py-3 text-red-400 text-sm">
                                <LogOut className="w-5 h-5" /> Sair
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
                <div className="p-6 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
