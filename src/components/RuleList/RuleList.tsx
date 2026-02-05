import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { validateRule } from '../../game/validator';
import { RuleItem } from './RuleItem';

export const RuleList: React.FC = () => {
    const { rules, grid } = useGameStore();

    return (
        <div className="w-full max-w-md mt-6 space-y-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Objectives</h3>
            {rules.map((rule) => {
                const isSatisfied = validateRule(grid, rule);
                return (
                    <RuleItem
                        key={rule.id}
                        rule={rule}
                        isSatisfied={isSatisfied}
                    />
                );
            })}
        </div>
    );
};
