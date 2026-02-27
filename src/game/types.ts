export type CellState = 'empty' | 'filled' | 'crossed' | 'locked';

export interface Cell {
    id: string;
    row: number;
    col: number;
    state: CellState;
    value: number | null; // For puzzles where values matter (e.g. Sudoku-like), or just binary filled/empty
    isError: boolean; // Visual feedback
}

export type Grid = Cell[][];

export type RuleType = 'row_unique' | 'col_unique' | 'adjacency' | 'sum_match' | 'pattern' | 'subgrid_unique';

export interface Rule {
    id: string;
    type: RuleType;
    description: string;
    target?: number; // e.g., sum must be 10
    args?: unknown; // Additional arguments for the rule
    isSatisfied: boolean;
}

export interface LevelConfig {
    id: string;
    size: number; // Grid size NxN
    rules: Rule[];
    targetMoves: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

export interface GameState {
    grid: Grid;
    rules: Rule[];
    level: LevelConfig | null;
    status: 'landing' | 'idle' | 'playing' | 'won' | 'lost';
    timer: number;
    moves: number;
    history: Grid[]; // Stack for undo
    selectedCell: { r: number; c: number } | null;
    bestTimes: Record<string, number>;
    isNewRecord: boolean;
}
