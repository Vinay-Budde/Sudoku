import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Home, RotateCcw, RotateCw, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const Controls: React.FC = () => {
    const { undo, resetLevel, startGame, level, setStatus } = useGameStore();
    const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard'>(level?.difficulty || 'easy');

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-6 mt-8 w-full max-w-2xl"
        >
            <div className="flex items-center gap-4 bg-slate-900/40 backdrop-blur-md p-2 rounded-2xl border border-slate-700/50 w-full justify-between px-6 shadow-xl">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Configuration</span>

                <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-sm font-semibold hidden sm:inline">Difficulty:</span>
                    <div className="relative">
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                            className="appearance-none bg-slate-800 text-indigo-100 text-sm font-bold py-2 pl-4 pr-10 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                            <option value="easy">Easy (4x4)</option>
                            <option value="medium">Medium (5x5)</option>
                            <option value="hard">Hard (6x6)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 w-full">
                <button
                    onClick={() => setStatus('landing')}
                    className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-700 text-slate-400 border border-slate-700/50 hover:border-slate-500 transition-all hover:scale-105 active:scale-95 shadow-lg group"
                    title="Back to Menu"
                >
                    <Home size={22} className="group-hover:text-indigo-400 transition-colors" />
                </button>

                <div className="h-8 w-px bg-slate-700/50 mx-2"></div>

                <div className="flex gap-4">
                    <button
                        onClick={undo}
                        className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-700 text-slate-400 border border-slate-700/50 hover:border-slate-500 transition-all hover:scale-105 active:scale-95 shadow-lg group"
                        title="Undo Move"
                    >
                        <RotateCcw size={22} className="group-hover:text-amber-400 transition-colors" />
                    </button>

                    <button
                        onClick={resetLevel}
                        className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-700 text-slate-400 border border-slate-700/50 hover:border-slate-500 transition-all hover:scale-105 active:scale-95 shadow-lg group"
                        title="Reset Level"
                    >
                        <RotateCw size={22} className="group-hover:text-rose-400 transition-colors" />
                    </button>
                </div>

                <div className="flex-1"></div>

                <button
                    onClick={() => startGame(difficulty)}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3 border border-indigo-400/20 group whitespace-nowrap"
                >
                    <Play size={20} fill="currentColor" className="group-hover:text-indigo-100" />
                    New Game
                </button>
            </div>
        </motion.div>
    );
};
