import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Trophy, RefreshCw } from 'lucide-react';

export const GameModal: React.FC = () => {
    const { status, level, startGame, moves, timer, isNewRecord } = useGameStore();

    // Only show for 'won' or 'lost' state
    const isVisible = status === 'won' || status === 'lost';

    if (!isVisible) return null;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {status === 'won' ? (
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ rotate: -10, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative"
                            >
                                <Trophy size={64} className="text-yellow-400 mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                                {isNewRecord && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.6, type: "spring" }}
                                        className="absolute -top-2 -right-6 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse"
                                    >
                                        NEW RECORD
                                    </motion.div>
                                )}
                            </motion.div>
                            <h2 className="text-3xl font-bold text-white mb-2">Level Complete!</h2>
                            <p className="text-slate-400 mb-6">{isNewRecord ? "Incredible speed! A new personal best." : "Excellent logical deduction."}</p>

                            <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                <div className="bg-slate-800 p-3 rounded-lg">
                                    <div className="text-xs text-slate-500 uppercase">Time</div>
                                    <div className="text-xl font-mono text-indigo-300">{formatTime(timer)}</div>
                                </div>
                                <div className="bg-slate-800 p-3 rounded-lg">
                                    <div className="text-xs text-slate-500 uppercase">Moves</div>
                                    <div className="text-xl font-mono text-indigo-300">{moves}</div>
                                </div>
                            </div>

                            <button
                                onClick={() => startGame(level?.difficulty || 'easy')}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={20} />
                                Play Again
                            </button>
                        </div>
                    ) : (
                        // Lost state (optional, if we add lose conditions)
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Game Over</h2>
                            <button
                                onClick={() => startGame(level?.difficulty || 'easy')}
                                className="w-full py-2 bg-slate-700 text-white rounded-lg"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
