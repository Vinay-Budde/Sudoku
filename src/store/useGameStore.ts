import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Grid, GameState } from '../game/types';
import { generateLevel } from '../game/generator';
import { validateRule, checkErrors } from '../game/validator';

interface GameActions {
    startGame: (difficulty?: 'easy' | 'medium' | 'hard') => void;
    setCellValue: (row: number, col: number, value: number | null) => void;
    checkWinCondition: () => void;
    undo: () => void;
    resetLevel: () => void;
    tickTimer: () => void;
    setStatus: (status: GameState['status']) => void;
}

// Helper to deep copy grid
const copyGrid = (grid: Grid): Grid => grid.map(row => row.map(cell => ({ ...cell })));

export const useGameStore = create<GameState & GameActions>()(
    persist(
        (set, get) => ({
            // Initial State
            grid: [],
            rules: [],
            level: null,
            status: 'landing',
            timer: 0,
            moves: 0,
            history: [],

            startGame: (difficulty = 'easy') => {
                const sizeMap = {
                    easy: 4,
                    medium: 5,
                    hard: 6
                };
                const size = sizeMap[difficulty];
                const { level, initialGrid } = generateLevel(size, difficulty);
                set({
                    grid: initialGrid,
                    rules: level.rules,
                    level,
                    status: 'playing',
                    timer: 0,
                    moves: 0,
                    history: [] // Reset history
                });
            },

            setCellValue: (row, col, value) => {
                const { grid, history, status, moves } = get();
                if (status !== 'playing') return;

                const cell = grid[row][col];
                if (cell.state === 'locked') return; // Cannot edit locked cells
                if (cell.value === value) return; // No change

                // Push current grid to history before modifying
                const newHistory = [...history, copyGrid(grid)];

                const newGrid = copyGrid(grid);
                newGrid[row][col].value = value;
                newGrid[row][col].state = value ? 'filled' : 'empty';

                // Clear errors associated with this cell locally? 
                // Or re-run error check for the whole grid? 
                // Let's re-run error check to keep it consistent.
                // For performance, we might optimize later.
                const errorIds = checkErrors(newGrid);
                newGrid.forEach(r => r.forEach(c => {
                    c.isError = errorIds.has(c.id);
                }));

                set({
                    grid: newGrid,
                    history: newHistory,
                    moves: moves + 1
                });

                get().checkWinCondition();
            },

            undo: () => {
                const { history } = get();
                if (history.length === 0) return;

                const previousGrid = history[history.length - 1];
                set({
                    grid: previousGrid,
                    history: history.slice(0, -1),
                    // Don't decrease moves? Usually undo counts as an action or we just leave moves as "actions taken"
                    // Let's keep moves as is.
                });
            },

            resetLevel: () => {
                const { history } = get();
                if (history.length === 0) return;
                // Rewind to the very first history entry? 
                // Actually, history might be limited. 
                // Better to regenerate from level config or keep initial state.
                // Let's just use the oldest history if available, or just clear values of non-locked cells.

                const { grid } = get();
                const newGrid = copyGrid(grid);
                newGrid.forEach(row => row.forEach(cell => {
                    if (cell.state !== 'locked') {
                        cell.value = null;
                        cell.state = 'empty';
                        cell.isError = false;
                    }
                }));

                set({
                    grid: newGrid,
                    history: [],
                    moves: 0,
                    timer: 0,
                    status: 'playing'
                });
            },

            checkWinCondition: () => {
                const { grid, rules } = get();

                // 1. All cells filled?
                let allFilled = true;
                for (const row of grid) {
                    for (const cell of row) {
                        if (cell.value === null) {
                            allFilled = false;
                            break;
                        }
                    }
                }

                if (!allFilled) return;

                // 2. All rules satisfied?
                const allRulesSatisfied = rules.every(rule => validateRule(grid, rule));

                if (allRulesSatisfied) {
                    set({ status: 'won' });
                }
            },

            tickTimer: () => {
                const { status, timer } = get();
                if (status === 'playing') {
                    set({ timer: timer + 1 });
                }
            },

            setStatus: (status) => set({ status })
        }),
        {
            name: 'logic-grid-game-storage', // name of the item in the storage (must be unique)
            partialize: (state) => ({
                // Persist everything except history if large? 
                // For now persist minimal state.
                level: state.level,
                timer: state.timer,
                moves: state.moves,
                status: state.status,
                grid: state.grid
            }),
        }
    )
);
