import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { CheckCircle2, Circle } from 'lucide-react';
import { validateRule } from '../game/validator';

export const RuleList: React.FC = () => {
    const { rules, grid } = useGameStore();

    return (
        <div className="w-full max-w-md mt-6 space-y-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Objectives</h3>
            {rules.map((rule) => {
                const isSatisfied = validateRule(grid, rule);
                return (
                    <div
                        key={rule.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-800/50"
                    >
                        {isSatisfied ? (
                            <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 shrink-0" />
                        ) : (
                            <Circle size={20} className="text-slate-600 mt-0.5 shrink-0" />
                        )}
                        <p className={isSatisfied ? "text-slate-400 line-through decoration-slate-600" : "text-slate-200"}>
                            {rule.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};
