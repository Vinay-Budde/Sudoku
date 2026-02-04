import type { Grid, Rule } from './types';

export function validateRule(grid: Grid, rule: Rule): boolean {
    switch (rule.type) {
        case 'row_unique':
            return checkUnique(grid, 'row');
        case 'col_unique':
            return checkUnique(grid, 'col');
        default:
            console.warn(`Unknown rule type: ${rule.type}`);
            return true; // Default to true to avoid blocking
    }
}

function checkUnique(grid: Grid, mode: 'row' | 'col'): boolean {
    const size = grid.length;

    for (let i = 0; i < size; i++) {
        const seen = new Set<number>();
        const line = mode === 'row' ? grid[i] : grid.map(row => row[i]);

        // Check if line is fully filled first? 
        // Usually logic puzzles require the grid to be fully valid only at the end, 
        // but typically duplicate rules are "hard" rules (cell turns red immediately).
        // For "isSatisfied" (win condition), we need all cells to be filled AND valid.

        // First, check if line is complete. If not, rule is technically not satisfied "globally".
        // But for "satisfied" state, let's assume we adhere to:
        // 1. No duplicates present
        // 2. All cells filled (optional check, maybe separated)

        // Let's just check for duplicates and full line.
        const values = line.map(c => c.value).filter(v => v !== null) as number[];

        // If not fully filled, not satisfied
        if (values.length !== size) return false;

        for (const v of values) {
            if (seen.has(v)) return false;
            seen.add(v);
        }
    }
    return true;
}

// Check for errors to display UI feedback (red cells)
export function checkErrors(grid: Grid): Set<string> {
    const errorIds = new Set<string>();
    const size = grid.length;

    // Row Duplicates
    for (let r = 0; r < size; r++) {
        const counts = new Map<number, string[]>(); // value -> ids[]
        for (let c = 0; c < size; c++) {
            const cell = grid[r][c];
            if (cell.value !== null) {
                const existing = counts.get(cell.value) || [];
                existing.push(cell.id);
                counts.set(cell.value, existing);
            }
        }
        for (const ids of counts.values()) {
            if (ids.length > 1) {
                ids.forEach(id => errorIds.add(id));
            }
        }
    }

    // Col Duplicates
    for (let c = 0; c < size; c++) {
        const counts = new Map<number, string[]>();
        for (let r = 0; r < size; r++) {
            const cell = grid[r][c];
            if (cell.value !== null) {
                const existing = counts.get(cell.value) || [];
                existing.push(cell.id);
                counts.set(cell.value, existing);
            }
        }
        for (const ids of counts.values()) {
            if (ids.length > 1) {
                ids.forEach(id => errorIds.add(id));
            }
        }
    }

    return errorIds;
}
