'use client';

import { FileText } from 'lucide-react';

// TODO: Implementar logs detalhados de acesso
// Funcionalidades planejadas:
// - Histórico completo de cada visita (IP, hora, user-agent, páginas)
// - Filtros avançados (por IP, por cidade, por período, por user-agent)
// - Exportação CSV
// - Detalhamento de sessão individual (jornada completa do visitante)
// - Detecção de bots vs humanos

export default function LogsPage() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-zinc-600" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Logs de Acesso</h2>
            <p className="text-zinc-400 text-sm max-w-md">
                Em breve! Esta página mostrará o histórico detalhado de cada visita,
                com filtros avançados e exportação de dados.
            </p>
            <span className="mt-4 px-4 py-1.5 bg-zinc-800/50 text-zinc-500 text-xs rounded-full border border-zinc-700">
                Em desenvolvimento
            </span>
        </div>
    );
}
