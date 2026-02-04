import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Cell } from '../Cell/Cell';

export const Grid: React.FC = () => {
    const { grid, startGame, level } = useGameStore();

    useEffect(() => {
        // Start game on mount if no level
        if (!level) {
            startGame();
        }
    }, [level, startGame]);

    if (!grid || grid.length === 0) return null;

    return (
        <motion.div
            className="grid gap-2 p-4 md:gap-3 md:p-6 glass-panel rounded-2xl"
            style={{ gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))` }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {grid.map((row) => (
                row.map((cell) => (
                    <Cell key={cell.id} cell={cell} />
                ))
            ))}
        </motion.div>
    );
};
