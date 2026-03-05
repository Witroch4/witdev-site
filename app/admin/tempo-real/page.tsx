'use client';

import { Clock } from 'lucide-react';

// TODO: Implementar visitantes em tempo real via Redis pub/sub ou WebSocket
// Funcionalidades planejadas:
// - Lista de visitantes online agora
// - Página atual de cada visitante  
// - Tempo na sessão atual
// - Atualização em tempo real (sem refresh)
// - Mapa ao vivo com pins dos visitantes

export default function TempoRealPage() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6">
                <Clock className="w-10 h-10 text-zinc-600" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Tempo Real</h2>
            <p className="text-zinc-400 text-sm max-w-md">
                Em breve! Esta página mostrará visitantes online em tempo real,
                com atualização automática usando Redis e WebSocket.
            </p>
            <span className="mt-4 px-4 py-1.5 bg-zinc-800/50 text-zinc-500 text-xs rounded-full border border-zinc-700">
                Em desenvolvimento
            </span>
        </div>
    );
}
