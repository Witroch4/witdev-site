'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Building, Users } from 'lucide-react';

interface LocationData {
    locations: Array<{
        country: string;
        region: string;
        city: string;
        latitude: number;
        longitude: number;
        views: string;
        visitors: string;
    }>;
    countries: Array<{ country: string; views: string; visitors: string }>;
    regions: Array<{ region: string; views: string; visitors: string }>;
}

const periods = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7 dias' },
    { value: '30d', label: '30 dias' },
    { value: '90d', label: '90 dias' },
];

const sites = [
    { value: '', label: 'Todos' },
    { value: 'witdev', label: 'witdev.com.br' },
    { value: 'amanda', label: 'amandasousaprev.adv.br' },
];

export default function MapaPage() {
    const [data, setData] = useState<LocationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('7d');
    const [site, setSite] = useState('');

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ period });
            if (site) params.set('site', site);
            const res = await fetch(`/api/admin/stats/locations?${params}`);
            if (res.ok) {
                setData(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch locations:', error);
        } finally {
            setLoading(false);
        }
    }, [period, site]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const totalVisitors = data?.locations.reduce((sum, l) => sum + parseInt(l.visitors), 0) || 0;
    const totalViews = data?.locations.reduce((sum, l) => sum + parseInt(l.views), 0) || 0;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <MapPin className="w-7 h-7 text-emerald-400" />
                        Localização dos Visitantes
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">De onde seus visitantes estão acessando</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={site}
                        onChange={(e) => setSite(e.target.value)}
                        className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    >
                        {sites.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                    <div className="flex bg-zinc-800/50 border border-zinc-700 rounded-lg p-0.5">
                        {periods.map((p) => (
                            <button
                                key={p.value}
                                onClick={() => setPeriod(p.value)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all
                  ${period === p.value ? 'bg-emerald-500 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading && !data ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Globe className="w-5 h-5 text-blue-400" />
                                <span className="text-sm text-zinc-400">Países</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{data?.countries.length || 0}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Building className="w-5 h-5 text-violet-400" />
                                <span className="text-sm text-zinc-400">Cidades</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{data?.locations.length || 0}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="w-5 h-5 text-emerald-400" />
                                <span className="text-sm text-zinc-400">Visitantes Únicos</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{totalVisitors.toLocaleString('pt-BR')}</p>
                        </motion.div>
                    </div>

                    {/* Tables Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Countries */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-blue-400" />
                                Por País
                            </h3>
                            <div className="space-y-3">
                                {data?.countries.map((c, i) => {
                                    const percentage = totalViews > 0 ? Math.round((parseInt(c.views) / totalViews) * 100) : 0;
                                    return (
                                        <div key={c.country} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-300">{c.country}</span>
                                                <span className="text-zinc-400">
                                                    {parseInt(c.visitors).toLocaleString('pt-BR')} visitantes · {percentage}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                                {(!data?.countries || data.countries.length === 0) && (
                                    <p className="text-zinc-500 text-sm text-center py-8">Nenhum dado de localização ainda</p>
                                )}
                            </div>
                        </motion.div>

                        {/* Regions / States */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Building className="w-5 h-5 text-violet-400" />
                                Por Estado / Região
                            </h3>
                            <div className="space-y-3">
                                {data?.regions.map((r, i) => {
                                    const percentage = totalViews > 0 ? Math.round((parseInt(r.views) / totalViews) * 100) : 0;
                                    return (
                                        <div key={r.region} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-300">{r.region}</span>
                                                <span className="text-zinc-400">
                                                    {parseInt(r.visitors).toLocaleString('pt-BR')} visitantes · {percentage}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                                                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                                {(!data?.regions || data.regions.length === 0) && (
                                    <p className="text-zinc-500 text-sm text-center py-8">Nenhum dado de localização ainda</p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Cities Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-emerald-400" />
                            Por Cidade
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-zinc-400 border-b border-zinc-800">
                                        <th className="text-left py-3 px-4 font-medium">#</th>
                                        <th className="text-left py-3 px-4 font-medium">Cidade</th>
                                        <th className="text-left py-3 px-4 font-medium">Estado</th>
                                        <th className="text-left py-3 px-4 font-medium">País</th>
                                        <th className="text-right py-3 px-4 font-medium">Views</th>
                                        <th className="text-right py-3 px-4 font-medium">Visitantes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.locations.map((loc, i) => (
                                        <tr key={`${loc.city}-${loc.region}`} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition">
                                            <td className="py-3 px-4 text-zinc-500 font-medium">{i + 1}</td>
                                            <td className="py-3 px-4 text-zinc-300">{loc.city}</td>
                                            <td className="py-3 px-4 text-zinc-400">{loc.region}</td>
                                            <td className="py-3 px-4 text-zinc-400">{loc.country}</td>
                                            <td className="py-3 px-4 text-right text-zinc-300">{parseInt(loc.views).toLocaleString('pt-BR')}</td>
                                            <td className="py-3 px-4 text-right text-zinc-300">{parseInt(loc.visitors).toLocaleString('pt-BR')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {(!data?.locations || data.locations.length === 0) && (
                                <p className="text-zinc-500 text-sm text-center py-8">Nenhum dado de localização ainda</p>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}
