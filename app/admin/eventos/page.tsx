'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, ArrowLeftRight, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface EventsData {
    events: Array<{
        id: number;
        site_id: string;
        path: string;
        event_type: string;
        event_data: Record<string, unknown> | null;
        ip_address: string;
        city: string | null;
        country: string | null;
        created_at: string;
    }>;
    total: number;
    page: number;
    limit: number;
    topEvents: Array<{
        event_type: string;
        element: string | null;
        count: string;
    }>;
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

function getEventTypeColor(type: string): string {
    switch (type) {
        case 'click': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        case 'scroll': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        case 'form': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
}

function getEventIcon(type: string): string {
    switch (type) {
        case 'click': return '🖱️';
        case 'scroll': return '📜';
        case 'form': return '📝';
        default: return '⚡';
    }
}

export default function EventosPage() {
    const [data, setData] = useState<EventsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('7d');
    const [site, setSite] = useState('');
    const [page, setPage] = useState(1);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ period, page: page.toString() });
            if (site) params.set('site', site);
            const res = await fetch(`/api/admin/stats/events?${params}`);
            if (res.ok) {
                setData(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
        }
    }, [period, site, page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <MousePointerClick className="w-7 h-7 text-blue-400" />
                        Rastreio de Eventos
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Ações dos visitantes nos seus sites</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={site}
                        onChange={(e) => { setSite(e.target.value); setPage(1); }}
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
                                onClick={() => { setPeriod(p.value); setPage(1); }}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all
                  ${period === p.value ? 'bg-blue-500 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading && !data ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    {/* Top Events Summary */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-1 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">Eventos Mais Frequentes</h3>
                            <div className="space-y-3">
                                {data?.topEvents.map((event, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-md border ${getEventTypeColor(event.event_type)}`}>
                                                {getEventIcon(event.event_type)} {event.event_type}
                                            </span>
                                            <span className="text-sm text-zinc-300 truncate max-w-[150px]">
                                                {event.element || '—'}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-zinc-400">
                                            {parseInt(event.count).toLocaleString('pt-BR')}×
                                        </span>
                                    </div>
                                ))}
                                {(!data?.topEvents || data.topEvents.length === 0) && (
                                    <p className="text-zinc-500 text-sm text-center py-8">
                                        Nenhum evento rastreado ainda.
                                        <br />
                                        <span className="text-xs text-zinc-600 mt-2 block">
                                            Adicione <code className="bg-zinc-800 px-1 rounded">data-track=&quot;nome&quot;</code> nos elementos HTML
                                        </span>
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Events Timeline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Timeline de Eventos</h3>
                                <span className="text-sm text-zinc-400">{data?.total.toLocaleString('pt-BR') || 0} eventos</span>
                            </div>

                            <div className="space-y-2">
                                {data?.events.map((event) => {
                                    const eventData = event.event_data as Record<string, string> | null;
                                    return (
                                        <div key={event.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-zinc-800/30 transition group">
                                            {/* Time */}
                                            <div className="text-xs text-zinc-500 whitespace-nowrap pt-0.5 w-20">
                                                {new Date(event.created_at).toLocaleString('pt-BR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>

                                            {/* Event type badge */}
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-md border whitespace-nowrap ${getEventTypeColor(event.event_type)}`}>
                                                {getEventIcon(event.event_type)} {event.event_type}
                                            </span>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm text-zinc-300">
                                                    {eventData?.element && (
                                                        <span className="font-medium text-white">{eventData.element as string}</span>
                                                    )}
                                                    {eventData?.text && (
                                                        <span className="text-zinc-400 ml-2">&quot;{(eventData.text as string).slice(0, 50)}&quot;</span>
                                                    )}
                                                    {event.event_type === 'scroll' && eventData?.depth && (
                                                        <span className="text-amber-400 font-medium">{eventData.depth as string}% scroll</span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2">
                                                    <span className="font-mono">{event.path}</span>
                                                    {event.city && <span>· {event.city}, {event.country}</span>}
                                                    <span className="opacity-0 group-hover:opacity-100 transition">
                                                        · {event.site_id}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {(!data?.events || data.events.length === 0) && (
                                    <p className="text-zinc-500 text-sm text-center py-12">
                                        Nenhum evento rastreado ainda.
                                        <br />
                                        <span className="text-xs text-zinc-600 mt-2 block">
                                            Eventos de clique, scroll e formulário aparecerão aqui conforme os visitantes interagirem.
                                        </span>
                                    </p>
                                )}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-zinc-800/50">
                                    <button
                                        onClick={() => setPage(Math.max(1, page - 1))}
                                        disabled={page === 1}
                                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Anterior
                                    </button>
                                    <span className="text-sm text-zinc-400">
                                        {page} de {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                                        disabled={page === totalPages}
                                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                                    >
                                        Próximo <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
}
