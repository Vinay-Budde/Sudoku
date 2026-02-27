import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Cell } from '../Cell/Cell';

export const Grid: React.FC = () => {
    const { grid, startGame, level, selectedCell, setSelectedCell, setCellValue, status } = useGameStore();

    useEffect(() => {
        // Start game on mount if no level
        if (!level && status !== 'won' && status !== 'lost') {
            startGame();
        }
    }, [level, startGame, status]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (status !== 'playing') return;

            if (selectedCell) {
                const { r, c } = selectedCell;
                const size = level?.size || 4;

                if (e.key === 'ArrowUp') {
                    setSelectedCell(Math.max(0, r - 1), c);
                    e.preventDefault();
                } else if (e.key === 'ArrowDown') {
                    setSelectedCell(Math.min(size - 1, r + 1), c);
                    e.preventDefault();
                } else if (e.key === 'ArrowLeft') {
                    setSelectedCell(r, Math.max(0, c - 1));
                    e.preventDefault();
                } else if (e.key === 'ArrowRight') {
                    setSelectedCell(r, Math.min(size - 1, c + 1));
                    e.preventDefault();
                } else if (e.key === 'Backspace' || e.key === 'Delete') {
                    setCellValue(r, c, null);
                } else if (e.key >= '1' && e.key <= '9') {
                    const num = parseInt(e.key, 10);
                    if (num <= size) {
                        setCellValue(r, c, num);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, status, level?.size, setSelectedCell, setCellValue]);

    if (!grid || grid.length === 0) return null;

    return (
        <motion.div
            className="grid gap-[2px] p-2 md:p-4 glass-panel rounded-xl bg-slate-900 shadow-2xl border border-slate-700 w-max mx-auto"
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
