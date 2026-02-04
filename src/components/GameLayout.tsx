import React from 'react';
import { Grid } from './Grid/Grid';
import { HUD, Controls } from './HUD/HUD';
import { RuleList } from './RuleList';
import { GameModal } from './Modal/GameModal';

export const GameLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_200px,#312e81,transparent)] opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_500px_at_100%_100%,#1e1b4b,transparent)] opacity-40 pointer-events-none"></div>

            <GameModal />
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                    LOGIC GRID
                </h1>
                <p className="text-slate-500 mt-2">Deduce. Solve. Conquer.</p>
            </header>

            <HUD />

            <div className="flex flex-col md:flex-row items-start gap-8 mt-4">
                <div className="flex-1">
                    <Grid />
                    <Controls />
                </div>

                <div className="hidden md:block w-72">
                    <RuleList />
                </div>

                {/* Mobile Rule List below */}
                <div className="md:hidden w-full">
                    <RuleList />
                </div>
            </div>

            <footer className="mt-12 text-slate-600 text-sm">
                Puzzle Strategy Game &copy; 2026
            </footer>
        </div>
    );
};
