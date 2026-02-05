import React, { useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Timer, Trophy, AlertCircle, Move } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export const HUD: React.FC = () => {
    const { timer, moves, level, tickTimer, status } = useGameStore();

    useEffect(() => {
        const interval = setInterval(() => {
            tickTimer();
        }, 1000);
        return () => clearInterval(interval);
    }, [tickTimer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between w-full max-w-2xl mb-8 px-8 py-4 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-full shadow-2xl"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-full">
                    <Timer size={22} className="text-indigo-400" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Time</span>
                    <span className="font-mono text-xl text-indigo-100 font-bold leading-none">{formatTime(timer)}</span>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="px-4 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                        {level?.difficulty} MODE
                    </span>
                </div>
                <div className={clsx("text-sm font-black tracking-wide flex items-center gap-2", {
                    "text-emerald-400": status === 'won',
                    "text-rose-400": status === 'lost',
                    "text-slate-300": status === 'playing'
                })}>
                    {status === 'won' && <Trophy size={14} />}
                    {status === 'playing' ? 'SYSTEM ACTIVE' : status.toUpperCase()}
                    {status === 'lost' && <AlertCircle size={14} />}
                </div>
            </div>

            <div className="flex items-center gap-3 text-right">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Moves</span>
                    <span className="font-mono text-xl text-indigo-100 font-bold leading-none">{moves}</span>
                </div>
                <div className="p-2 bg-indigo-500/10 rounded-full">
                    <Move size={22} className="text-indigo-400" />
                </div>
            </div>
        </motion.div>
    );
};
