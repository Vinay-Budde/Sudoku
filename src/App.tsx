import { GameLayout } from './components/GameLayout';
import { LandingPage } from './components/LandingPage/LandingPage';
import { useGameStore } from './store/useGameStore';

function App() {
  const status = useGameStore((state) => state.status);

  return (
    <>
      {status === 'landing' ? <LandingPage /> : <GameLayout />}
    </>
  );
}

export default App;
