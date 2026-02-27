import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { Cell as CellType } from '../../game/types';
import { useGameStore } from '../../store/useGameStore';

interface CellProps {
    cell: CellType;
}

export const Cell: React.FC<CellProps> = ({ cell }) => {
    const { setCellValue, status, level, selectedCell, setSelectedCell } = useGameStore();

    const isSelected = selectedCell?.r === cell.row && selectedCell?.c === cell.col;

    const size = level?.size || 4;
    const isSudoku = size === 9;
    const sizeClass = isSudoku
        ? "w-8 h-8 md:w-12 md:h-12 text-sm md:text-xl rounded-md md:rounded-lg"
        : "w-10 h-10 md:w-16 md:h-16 text-xl md:text-3xl rounded-xl";

    const isThickRight = isSudoku && cell.col % 3 === 2 && cell.col !== 8;
    const isThickBottom = isSudoku && cell.row % 3 === 2 && cell.row !== 8;

    const handleClick = () => {
        if (status !== 'playing') return;

        setSelectedCell(cell.row, cell.col);

        if (cell.state === 'locked') return;

        // Cycle values based on grid size
        const maxVal = level?.size || 4;
        const currentValue = cell.value || 0;
        const nextValue = currentValue >= maxVal ? null : currentValue + 1;

        setCellValue(cell.row, cell.col, nextValue);
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        if (status !== 'playing') return;

        setSelectedCell(cell.row, cell.col);

        if (cell.state === 'locked') return;
        setCellValue(cell.row, cell.col, null);
    };

    return (
        <motion.div
            layoutId={`cell-${cell.id}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={clsx(
                "relative flex items-center justify-center font-bold cursor-pointer transition-colors duration-300 select-none",
                sizeClass,
                {
                    // Thick Borders for Sudoku
                    "border-r-4 border-r-indigo-400/30": isThickRight,
                    "border-b-4 border-b-indigo-400/30": isThickBottom,

                    // Empty
                    "border border-slate-700/50 bg-slate-800/40 hover:bg-slate-700/60 hover:border-slate-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]": cell.state === 'empty',

                    // Locked (Pre-filled)
                    "border border-slate-700 bg-slate-900/80 text-slate-500 cursor-default shadow-inner": cell.state === 'locked' && !cell.isError,

                    // Locked Error
                    "border border-rose-700 bg-slate-900/80 text-rose-500 animate-pulse cursor-default shadow-[0_0_10px_rgba(225,29,72,0.4)]": cell.state === 'locked' && cell.isError,

                    // Filled by user
                    "border border-indigo-500 bg-indigo-500/20 text-indigo-200 shadow-[0_0_10px_rgba(99,102,241,0.2)]": cell.state === 'filled' && !cell.isError,

                    // Filled Error
                    "border border-rose-500 bg-rose-500/20 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]": cell.state === 'filled' && cell.isError,

                    // Selected highlight
                    "ring-4 ring-cyan-400 ring-offset-2 ring-offset-slate-950 z-10": isSelected,
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
