import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { Cell as CellType } from '../../game/types';
import { useGameStore } from '../../store/useGameStore';

interface CellProps {
    cell: CellType;
}

export const Cell: React.FC<CellProps> = ({ cell }) => {
    const { setCellValue, status, level } = useGameStore();

    const handleClick = () => {
        if (cell.state === 'locked' || status !== 'playing') return;

        // Cycle values based on grid size
        const maxVal = level?.size || 4;
        const currentValue = cell.value || 0;
        const nextValue = currentValue >= maxVal ? null : currentValue + 1;

        setCellValue(cell.row, cell.col, nextValue);
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        // Right click could be "clear" or "mark as potential"
        // For now, let's make it clear
        if (cell.state === 'locked' || status !== 'playing') return;
        setCellValue(cell.row, cell.col, null);
    };

    return (
        <motion.div
            layoutId={`cell-${cell.id}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={clsx(
                "relative w-10 h-10 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-3xl font-bold rounded-xl cursor-pointer transition-all duration-300 select-none shadow-sm",
                "border-2",
                {
                    // Empty
                    "border-slate-700/50 bg-slate-800/40 hover:bg-slate-700/60 hover:border-slate-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]": cell.state === 'empty',

                    // Locked (Pre-filled)
                    "border-slate-700 bg-slate-900/80 text-slate-500 cursor-default shadow-inner": cell.state === 'locked',

                    // Filled by user
                    "border-indigo-500 bg-indigo-500/20 text-indigo-200 shadow-[0_0_10px_rgba(99,102,241,0.2)]": cell.state === 'filled' && !cell.isError,

                    // Error
                    "border-rose-500 bg-rose-500/20 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]": cell.isError,
                }
            )}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            whileHover={cell.state !== 'locked' && status === 'playing' ? { scale: 1.05 } : {}}
            whileTap={cell.state !== 'locked' && status === 'playing' ? { scale: 0.95 } : {}}
        >
            {cell.value}
        </motion.div>
    );
};
