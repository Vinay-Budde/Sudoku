import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface DifficultyConfig {
    id: 'easy' | 'medium' | 'hard';
    label: string;
    sub: string;
    icon: LucideIcon;
    color: string;
    border: string;
    bg: string;
    desc: string;
}

interface DifficultyCardProps {
    diff: DifficultyConfig;
    isSelected: boolean;
    onSelect: (id: 'easy' | 'medium' | 'hard') => void;
}

export const DifficultyCard: React.FC<DifficultyCardProps> = ({ diff, isSelected, onSelect }) => {
    const Icon = diff.icon;

    return (
        <button
            onClick={() => onSelect(diff.id)}
            className={`relative group p-6 rounded-2xl border transition-all duration-300 text-left ${isSelected
                ? `${diff.bg} ${diff.border} shadow-[0_0_30px_rgba(0,0,0,0.3)] scale-105`
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                } backdrop-blur-md`}
        >
            <div className={`p-3 rounded-xl inline-block mb-4 ${isSelected ? 'bg-black/20' : 'bg-slate-800/50'}`}>
                <Icon size={32} className={diff.color} />
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {diff.label}
            </h3>
            <div className="text-sm font-mono text-slate-500 mb-4">{diff.sub}</div>
            <p className="text-slate-400 text-sm leading-relaxed">
                {diff.desc}
            </p>

            {/* Selection indicator */}
            {isSelected && (
                <motion.div
                    layoutId="outline"
                    className={`absolute inset-0 rounded-2xl border-2 ${diff.border} pointer-events-none`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </button>
    );
};
