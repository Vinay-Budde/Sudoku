import React from 'react';
import { Home } from 'lucide-react';
import { Grid } from './Grid/Grid';
import { HUD } from './HUD/HUD';
import { Controls } from './HUD/Controls';
import { RuleList } from './RuleList/RuleList';
import { GameModal } from './Modal/GameModal';
import { useGameStore } from '../store/useGameStore';

export const GameLayout: React.FC = () => {
    const level = useGameStore(state => state.level);
    const setStatus = useGameStore(state => state.setStatus);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_200px,#312e81,transparent)] opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_500px_at_100%_100%,#1e1b4b,transparent)] opacity-40 pointer-events-none"></div>

            <button
                onClick={() => setStatus('landing')}
                className="fixed top-4 right-4 z-50 p-3 md:p-4 bg-slate-800/50 hover:bg-slate-700/80 backdrop-blur-md rounded-full border border-slate-600/50 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-lg group"
                title="Return to Home"
            >
                <Home size={24} className="group-hover:text-indigo-400 transition-colors" />
            </button>

            <GameModal />
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                    LOGIC GRID
                </h1>
                <p className="text-slate-500 mt-2">Deduce. Solve. Conquer.</p>
            </header>

            <HUD />

            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8 mt-4 w-full max-w-7xl mx-auto justify-center">
                <div className="flex flex-col items-center w-full xl:w-auto">
                    <div className="flex-none w-full overflow-x-auto flex justify-center pb-4">
                        <Grid />
                    </div>
                    <Controls key={level?.difficulty} />
                </div>

                <div className="flex flex-col gap-6 w-full max-w-md xl:w-80 shrink-0 mt-8 xl:mt-0">
                    <RuleList />
                </div>
            </div>

            <footer className="mt-12 text-slate-600 text-sm">
                Puzzle Strategy Game &copy; 2026
            </footer>
        </div>
    );
};
