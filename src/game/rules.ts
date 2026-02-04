import type { Rule, RuleType } from './types';

export const RULES: Record<string, Omit<Rule, 'id' | 'isSatisfied'>> = {
    ROW_UNIQUE: {
        type: 'row_unique',
        description: 'Each number must appear exactly once in each row.',
    },
    COL_UNIQUE: {
        type: 'col_unique',
        description: 'Each number must appear exactly once in each column.',
    },
    // Future rules: Adjacency, Sum, etc.
};

import { generateId } from '../utils/id';

export function createRule(type: RuleType, args?: unknown): Rule {
    const base = Object.values(RULES).find(r => r.type === type);
    // Fallback for custom rules not in basic dictionary
    const description = base ? base.description : 'Custom constraint';

    return {
        id: generateId(),
        type,
        description,
        args,
        isSatisfied: false,
    };
}
