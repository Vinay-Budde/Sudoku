import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { Rule } from '../../game/types';

interface RuleItemProps {
    rule: Rule;
    isSatisfied: boolean;
}

export const RuleItem: React.FC<RuleItemProps> = ({ rule, isSatisfied }) => {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-800/50">
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
};
