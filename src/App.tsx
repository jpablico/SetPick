import { useEffect, useMemo } from 'react';
import './index.css';
import './App.css';
import { useDraftState } from './hooks/useDraftState';
import { computeRecommendations } from './lib/scoring';
import { SAMPLE_PLAYERS } from './lib/sampleData';
import { ControlsPanel } from './components/ControlsPanel';
import { RecommendationsTable } from './components/RecommendationsTable';
import { RosterPanel } from './components/RosterPanel';

export default function App() {
  const [state, dispatch] = useDraftState();

  // init players
  useEffect(() => {
    dispatch({ type: 'INIT_PLAYERS', players: SAMPLE_PLAYERS });
  }, [dispatch]);

  const recs = useMemo(() => computeRecommendations(state), [state]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-neutral-950/70 backdrop-blur px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <h1 className="text-lg font-semibold">SetPick Draft Board</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-400">Round {state.round}</span>
            <button className="px-2 py-1 text-sm ring-1 ring-white/15 rounded hover:bg-white/10"
              onClick={()=>dispatch({type:'PREV_ROUND'})}>–</button>
            <button className="px-2 py-1 text-sm ring-1 ring-white/15 rounded hover:bg-white/10"
              onClick={()=>dispatch({type:'NEXT_ROUND'})}>+</button>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 p-4">
        <section className="lg:col-span-3">
          <ControlsPanel
            weights={state.weights}
            targets={state.targets}
            onChangeWeights={w=>dispatch({type:'SET_WEIGHTS', weights:w})}
            onIncTarget={pos=>dispatch({type:'INC_TARGET', pos})}
            onDecTarget={pos=>dispatch({type:'DEC_TARGET', pos})}
          />
        </section>

        <section className="lg:col-span-6">
          <RecommendationsTable
            rows={recs}
            onPickYou={id=>dispatch({type:'PICK_YOU', id})}
            onPickOther={id=>dispatch({type:'PICK_OTHER', id})}
          />
        </section>

        <section className="lg:col-span-3 space-y-6">
          <RosterPanel
            players={state.players}
            yourRosterIds={state.yourRosterIds}
          />
          <div>
            <button className="w-full px-3 py-2 text-sm ring-1 ring-white/15 rounded hover:bg-white/10"
              onClick={()=>location.reload()}>
              Reset (reload)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}