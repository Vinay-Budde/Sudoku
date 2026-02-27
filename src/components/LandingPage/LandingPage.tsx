
import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { motion } from 'framer-motion';
import { Play, Brain, Cpu, Zap, Star } from 'lucide-react';
import { DifficultyCard } from './DifficultyCard';

export const LandingPage = () => {
    const startGame = useGameStore(state => state.startGame);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'expert'>('easy');

    const handleStart = () => {
        startGame(difficulty);
    };

    const difficulties: {
        id: 'easy' | 'medium' | 'hard' | 'expert';
        label: string;
        sub: string;
        icon: typeof Brain;
        color: string;
        border: string;
        bg: string;
        desc: string;
    }[] = [
            {
                id: 'easy',
                label: 'Initiate',
                sub: '4x4 Grid',
                icon: Brain,
                color: 'text-emerald-400',
                border: 'border-emerald-500/50',
                bg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
                desc: 'For beginners. Learn the patterns.'
            },
            {
                id: 'medium',
                label: 'Advanced',
                sub: '5x5 Grid',
                icon: Cpu,
                color: 'text-cyan-400',
                border: 'border-cyan-500/50',
                bg: 'bg-cyan-500/10 hover:bg-cyan-500/20',
                desc: 'A true test of deductive reasoning.'
            },
            {
                id: 'hard',
                label: 'Master',
                sub: '6x6 Grid',
                icon: Zap,
                color: 'text-rose-400',
                border: 'border-rose-500/50',
                bg: 'bg-rose-500/10 hover:bg-rose-500/20',
                desc: 'Only for the sharpest minds.'
            },
            {
                id: 'expert',
                label: 'Expert',
                sub: '9x9 Sudoku',
                icon: Star,
                color: 'text-yellow-400',
                border: 'border-yellow-500/50',
                bg: 'bg-yellow-500/10 hover:bg-yellow-500/20',
                desc: 'Classic Sudoku rules with 3x3 blocks.'
            }
        ];

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_200px,#312e81,transparent)] opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_500px_at_100%_100%,#1e1b4b,transparent)] opacity-40 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 text-center mb-12"
            >
                <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md">
                    <Star className="text-yellow-400 w-6 h-6 mr-2" fill="currentColor" />
                    <span className="text-indigo-200 font-medium tracking-wider text-sm">PREMIUM PUZZLE EXPERIENCE</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 drop-shadow-2xl tracking-tight">
                    LOGIC GRID
                </h1>
                <p className="text-slate-400 mt-4 text-xl max-w-2xl mx-auto font-light leading-relaxed">
                    Enter the realm of pure deduction. Select your challenge and prove your intellect.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full max-w-5xl grid md:grid-cols-4 gap-4 md:gap-6 z-10 px-4"
            >
                {difficulties.map((diff) => (
                    <DifficultyCard
                        key={diff.id}
                        diff={diff}
                        isSelected={difficulty === diff.id}
                        onSelect={setDifficulty}
                    />
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 z-10 w-full max-w-md"
            >
                <button
                    onClick={handleStart}
                    className="w-full group relative py-5 px-8 bg-white text-slate-950 rounded-xl font-bold text-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-3">
                        <Play fill="currentColor" className="w-6 h-6" />
                        START SIMULATION
                    </span>
                </button>
                <div className="text-center mt-6 text-slate-600 text-sm font-mono">
                    v1.0.0 • SYSTEM READY
                </div>
            </motion.div>
        </div>
    );
};
