'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Eye,
    Clock,
    Activity,
    TrendingUp,
    Globe,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';

interface StatsData {
    overview: {
        totalViews: number;
        uniqueVisitors: number;
        sessions: number;
        avgDurationMs: number;
    };
    topPages: Array<{ path: string; views: string; visitors: string }>;
    dailyViews: Array<{ date: string; views: string; visitors: string }>;
    topReferrers: Array<{ referrer: string; views: string }>;
    bySite: Array<{ site_id: string; views: string; visitors: string }>;
}

const periods = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7 dias' },
    { value: '30d', label: '30 dias' },
    { value: '90d', label: '90 dias' },
];

const sites = [
    { value: '', label: 'Todos os sites' },
    { value: 'witdev', label: 'witdev.com.br' },
    { value: 'amanda', label: 'amandasousaprev.adv.br' },
];

function formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

function StatCard({
    title,
    value,
    icon: Icon,
    gradient,
    delay = 0,
}: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="relative overflow-hidden bg-zinc-900/50 backdrop-blur border border-zinc-800/50 rounded-2xl p-6"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} opacity-10 rounded-full blur-2xl -translate-y-8 translate-x-8`} />
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-zinc-400 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </motion.div>
    );
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('7d');
    const [site, setSite] = useState('');

    const fetchStats = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ period });
            if (site) params.set('site', site);
            const res = await fetch(`/api/admin/stats?${params}`);
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    }, [period, site]);

    useEffect(() => {
        fetchStats();
        // Auto-refresh a cada 60s
        const interval = setInterval(fetchStats, 60000);
        return () => clearInterval(interval);
    }, [fetchStats]);

    const chartData = stats?.dailyViews.map((d) => ({
        date: new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        views: parseInt(d.views),
        visitors: parseInt(d.visitors),
    })) || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-zinc-400 text-sm mt-1">Monitoramento dos seus sites em tempo real</p>
                </div>
                <div className="flex gap-3">
                    {/* Site filter */}
                    <select
                        value={site}
                        onChange={(e) => setSite(e.target.value)}
                        className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    >
                        {sites.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                    {/* Period filter */}
                    <div className="flex bg-zinc-800/50 border border-zinc-700 rounded-lg p-0.5">
                        {periods.map((p) => (
                            <button
                                key={p.value}
                                onClick={() => setPeriod(p.value)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all
                  ${period === p.value
                                        ? 'bg-blue-500 text-white'
                                        : 'text-zinc-400 hover:text-zinc-200'
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading && !stats ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Page Views"
                            value={stats?.overview.totalViews.toLocaleString('pt-BR') || '0'}
                            icon={Eye}
                            gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                            delay={0}
                        />
                        <StatCard
                            title="Visitantes Únicos"
                            value={stats?.overview.uniqueVisitors.toLocaleString('pt-BR') || '0'}
                            icon={Users}
                            gradient="bg-gradient-to-br from-violet-500 to-violet-700"
                            delay={0.1}
                        />
                        <StatCard
                            title="Sessões"
                            value={stats?.overview.sessions.toLocaleString('pt-BR') || '0'}
                            icon={Activity}
                            gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
                            delay={0.2}
                        />
                        <StatCard
                            title="Tempo Médio"
                            value={formatDuration(stats?.overview.avgDurationMs || 0)}
                            icon={Clock}
                            gradient="bg-gradient-to-br from-amber-500 to-amber-700"
                            delay={0.3}
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Visitas ao longo do tempo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-2 bg-zinc-900/50 backdrop-blur border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-400" />
                                Visitas ao longo do tempo
                            </h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                        <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
                                        <YAxis stroke="#71717a" fontSize={12} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#18181b',
                                                border: '1px solid #27272a',
                                                borderRadius: '12px',
                                                color: '#fff',
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="views"
                                            stroke="#3b82f6"
                                            fillOpacity={1}
                                            fill="url(#colorViews)"
                                            name="Views"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="visitors"
                                            stroke="#8b5cf6"
                                            fillOpacity={1}
                                            fill="url(#colorVisitors)"
                                            name="Visitantes"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Por site */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-zinc-900/50 backdrop-blur border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-emerald-400" />
                                Por Site
                            </h3>
                            <div className="space-y-4">
                                {stats?.bySite.map((s, i) => {
                                    const siteName = s.site_id === 'witdev' ? 'witdev.com.br' : s.site_id === 'amanda' ? 'amandasousaprev.adv.br' : s.site_id;
                                    const percentage = stats.overview.totalViews > 0
                                        ? Math.round((parseInt(s.views) / stats.overview.totalViews) * 100)
                                        : 0;
                                    return (
                                        <div key={s.site_id} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-300">{siteName}</span>
                                                <span className="text-zinc-400">{parseInt(s.views).toLocaleString('pt-BR')} views</span>
                                            </div>
                                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                                    className={`h-full rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-violet-500'}`}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                                {(!stats?.bySite || stats.bySite.length === 0) && (
                                    <p className="text-zinc-500 text-sm text-center py-8">Nenhum dado ainda</p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Pages */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-zinc-900/50 backdrop-blur border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">Páginas Mais Acessadas</h3>
                            <div className="space-y-3">
                                {stats?.topPages.map((page, i) => (
                                    <div key={page.path} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-zinc-500 w-6">{i + 1}</span>
                                            <span className="text-sm text-zinc-300 font-mono">{page.path}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="text-zinc-400">{parseInt(page.views).toLocaleString('pt-BR')} views</span>
                                            <span className="text-zinc-500">{parseInt(page.visitors).toLocaleString('pt-BR')} únicos</span>
                                        </div>
                                    </div>
                                ))}
                                {(!stats?.topPages || stats.topPages.length === 0) && (
                                    <p className="text-zinc-500 text-sm text-center py-8">Nenhum dado ainda</p>
                                )}
                            </div>
                        </motion.div>

                        {/* Top Referrers */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-zinc-900/50 backdrop-blur border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">Origens de Tráfego</h3>
                            <div className="space-y-3">
                                {stats?.topReferrers.map((ref, i) => {
                                    const displayName = ref.referrer === 'Direto' ? 'Acesso direto' : (() => {
                                        try { return new URL(ref.referrer).hostname; } catch { return ref.referrer; }
                                    })();
                                    return (
                                        <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${ref.referrer === 'Direto' ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                                                <span className="text-sm text-zinc-300">{displayName}</span>
                                            </div>
                                            <span className="text-sm text-zinc-400">{parseInt(ref.views).toLocaleString('pt-BR')}</span>
                                        </div>
                                    );
                                })}
                                {(!stats?.topReferrers || stats.topReferrers.length === 0) && (
                                    <p className="text-zinc-500 text-sm text-center py-8">Nenhum dado ainda</p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
}
