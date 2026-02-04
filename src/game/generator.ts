import type { Grid, Rule, LevelConfig } from './types';
import { createRule } from './rules';
import { generateId } from '../utils/id';

// Simple Latin Square generator for finding a valid solution
// (backtracking or just shifting for simple N)
function generateLatinSquare(size: number): number[][] {
    const result: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
    // Simple shift algorithm: row i, col j = (i + j) % size + 1
    // Add randomness by shuffling rows and cols

    // 1. Create base
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            result[i][j] = ((i + j) % size) + 1;
        }
    }

    // 2. Shuffle rows
    for (let i = size - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    // 3. Shuffle cols
    // Transpose, shuffle rows, transpose back
    // Or just swap cols directly
    for (let i = size - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // swap col i and j
        for (let r = 0; r < size; r++) {
            [result[r][i], result[r][j]] = [result[r][j], result[r][i]];
        }
    }

    return result;
}

export function generateLevel(size: number = 4, difficulty: 'easy' | 'medium' | 'hard' = 'easy'): { level: LevelConfig, initialGrid: Grid } {
    const solution = generateLatinSquare(size);

    // Create configured rules
    const rules: Rule[] = [
        createRule('row_unique'),
        createRule('col_unique'),
    ];

    // Create initial grid
    // For easy, maybe pre-fill some cells?
    // Number of cells to remove:
    // easy: remove 30%
    // medium: remove 50%
    // hard: remove 70%

    let removeCount = 0;
    switch (difficulty) {
        case 'easy': removeCount = Math.floor(size * size * 0.4); break;
        case 'medium': removeCount = Math.floor(size * size * 0.6); break;
        case 'hard': removeCount = Math.floor(size * size * 0.75); break;
    }

    const initialGrid: Grid = solution.map((row, rIndex) =>
        row.map((val, cIndex) => ({
            id: `${rIndex}-${cIndex}`,
            row: rIndex,
            col: cIndex,
            state: 'filled', // temporarily filled, we will empty some
            value: val,
            isError: false
        }))
    );

    const indices = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            indices.push({ r, c });
        }
    }

    // Shuffle indices to remove random cells
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Clear values
    for (let i = 0; i < removeCount; i++) {
        const { r, c } = indices[i];
        initialGrid[r][c].value = null;
        initialGrid[r][c].state = 'empty';
    }

    // Lock the remaining ones
    initialGrid.forEach(row => {
        row.forEach(cell => {
            if (cell.value !== null) {
                cell.state = 'locked';
            }
        });
    });

    const level: LevelConfig = {
        id: generateId(),
        size,
        rules,
        targetMoves: size * size, // rough estimate
        difficulty
    };

    return { level, initialGrid };
}
