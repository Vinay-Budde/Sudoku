import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Home, RotateCcw, RotateCw, Play, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export const Controls: React.FC = () => {
    const { undo, resetLevel, startGame, level, setStatus } = useGameStore();
    const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard' | 'expert'>(level?.difficulty || 'easy');

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 mx-auto w-full max-w-fit px-4"
        >
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 bg-slate-900/60 backdrop-blur-2xl p-3 md:px-6 md:py-3 rounded-3xl lg:rounded-full border border-slate-700/50 shadow-2xl relative overflow-visible">

                {/* Subtle highlight effect inside container */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"></div>

                {/* Left: Configuration */}
                <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 justify-center">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest hidden lg:block text-right">Level</span>
                    <div className="relative flex-1 lg:flex-none w-full lg:w-48">
                        <select
                            value={difficulty}
                            onChange={(e) => {
                                const newDiff = e.target.value as 'easy' | 'medium' | 'hard' | 'expert';
                                setDifficulty(newDiff);
                                startGame(newDiff);
                            }}
                            className="w-full appearance-none bg-slate-800/80 hover:bg-slate-700/80 text-white text-sm font-semibold py-2.5 pl-5 pr-10 rounded-2xl lg:rounded-full border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors cursor-pointer shadow-inner text-center lg:text-left"
                        >
                            <option value="easy">Easy (4x4)</option>
                            <option value="medium">Medium (5x5)</option>
                            <option value="hard">Hard (6x6)</option>
                            <option value="expert">Expert (9x9)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                {/* Middle: Actions/Tools */}
                <div className="flex bg-slate-950/50 rounded-2xl lg:rounded-full p-1.5 border border-slate-800/80 shadow-inner w-full lg:w-auto justify-center shrink-0">
                    <button
                        onClick={undo}
                        className="flex-1 lg:flex-none px-4 py-2 rounded-xl lg:rounded-full hover:bg-slate-800/80 text-slate-400 hover:text-white transition-all group flex items-center justify-center gap-2"
                        title="Undo Move"
                    >
                        <RotateCcw size={16} className="group-hover:text-amber-400 transition-colors" />
                        <span className="text-xs font-semibold tracking-wide hidden sm:block">Undo</span>
                    </button>

                    <div className="w-px bg-slate-800/80 my-2 mx-1 lg:mx-2"></div>

                    <button
                        onClick={resetLevel}
                        className="flex-1 lg:flex-none px-4 py-2 rounded-xl lg:rounded-full hover:bg-slate-800/80 text-slate-400 hover:text-white transition-all group flex items-center justify-center gap-2"
                        title="Reset Level"
                    >
                        <RotateCw size={16} className="group-hover:text-rose-400 transition-colors" />
                        <span className="text-xs font-semibold tracking-wide hidden sm:block">Reset</span>
                    </button>

                    <div className="w-px bg-slate-800/80 my-2 mx-1 lg:mx-2"></div>

                    <button
                        onClick={() => setStatus('landing')}
                        className="flex-1 lg:flex-none px-4 py-2 rounded-xl lg:rounded-full hover:bg-slate-800/80 text-slate-400 hover:text-white transition-all group flex items-center justify-center gap-2"
                        title="Back to Menu"
                    >
                        <Home size={16} className="group-hover:text-teal-400 transition-colors" />
                        <span className="text-xs font-semibold tracking-wide hidden sm:block">Home</span>
                    </button>
                </div>

                {/* Right: New Game */}
                <button
                    onClick={() => startGame(difficulty)}
                    className="w-full lg:w-auto px-8 py-3 lg:py-2.5 rounded-2xl lg:rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-bold shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group whitespace-nowrap shrink-0 border border-indigo-400/30"
                >
                    <Play size={16} fill="currentColor" className="text-indigo-100 group-hover:text-white transition-colors" />
                    NEW GAME
                </button>
            </div>
        </motion.div>
    );
};
