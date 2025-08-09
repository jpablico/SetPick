import { useReducer } from 'react';
import type { DraftState, Player, Pos, Weights } from '../lib/types';

type Action =
  | { type: 'INIT_PLAYERS'; players: Player[] }
  | { type: 'PICK_YOU'; id: string }
  | { type: 'PICK_OTHER'; id: string }
  | { type: 'UNDO_OTHER'; id: string }
  | { type: 'SET_WEIGHTS'; weights: Partial<Weights> }
  | { type: 'INC_TARGET'; pos: Pos }
  | { type: 'DEC_TARGET'; pos: Pos }
  | { type: 'NEXT_ROUND' }
  | { type: 'PREV_ROUND' };

export const initialState: DraftState = {
  players: [],
  yourRosterIds: [],
  takenByOthers: new Set<string>(),
  round: 1,
  targets: { S:1, OH:2, MB:2, OPP:1, L:1, U:1 },
  weights: { skill: 0.5, fit: 0.2, balance: 0.2, scarcity: 0.1 },
  stats: { othersSettersTaken: 0 },
  flags: { seventyFiveShiftDone: false, round6ShiftDone: false, othersSetterShiftDone: false },
};

function reducer(state: DraftState, action: Action): DraftState {
  switch (action.type) {
    case 'INIT_PLAYERS': return { ...state, players: action.players };
    case 'PICK_YOU': {
      if (state.yourRosterIds.includes(action.id)) return state;
      const nextRoster = [...state.yourRosterIds, action.id];

      let nextWeights = state.weights;
      const picked = state.players.find(p=>p.id===action.id);

     // 1) After you draft a primary setter
       if (picked?.positions.primary === 'S') {
           nextWeights = applyDelta(nextWeights, { balance: -0.20, skill: +0.15, fit: +0.05 });
      }

      // 3) When your target position is 75% filled (overall across targets)
      const ratio = totalHave({ ...state, yourRosterIds: nextRoster }) / Math.max(1, totalTargets(state.targets));
      const flags = { ...(state.flags||{}) };
      if (!flags.seventyFiveShiftDone && ratio >= 0.75) {
        nextWeights = applyDelta(nextWeights, { balance: -0.25, skill: +0.15, fit: +0.10 });
        flags.seventyFiveShiftDone = true;
      }

  return { ...state, yourRosterIds: nextRoster, weights: nextWeights, flags };
}
    case 'PICK_OTHER': {
      if (state.takenByOthers.has(action.id)) return state;
      const s = new Set(state.takenByOthers); s.add(action.id);

      let stats = { ...(state.stats || { othersSettersTaken: 0 }) };
      let flags = { ...(state.flags || {}) };
      let nextWeights = state.weights;

      const picked = state.players.find(p=>p.id===action.id);
      if (picked?.positions.primary === 'S') {
        stats.othersSettersTaken += 1;
      }

      // 2) After 2+ setters taken by others
      if (!flags.othersSetterShiftDone && stats.othersSettersTaken >= 2) {
        nextWeights = applyDelta(nextWeights, { scarcity: +0.15, balance: +0.10, skill: -0.15, fit: -0.10 });
        flags.othersSetterShiftDone = true;
      }

      return { ...state, takenByOthers: s, stats, flags, weights: nextWeights };
  }

    case 'UNDO_OTHER': {
      const s = new Set(state.takenByOthers); s.delete(action.id);
      return { ...state, takenByOthers: s };
    }
    case 'SET_WEIGHTS': return { ...state, weights: normalize({ ...state.weights, ...action.weights }) };
    case 'INC_TARGET': return { ...state, targets: { ...state.targets, [action.pos]: state.targets[action.pos] + 1 } };
    case 'DEC_TARGET': return { ...state, targets: { ...state.targets, [action.pos]: Math.max(0, state.targets[action.pos] - 1) } };
    case 'NEXT_ROUND': {
      const newRound = state.round + 1;
      let nextWeights = state.weights;
      const flags = { ...(state.flags || {}) };

      // 4) When you reach round 6+
      if (!flags.round6ShiftDone && newRound >= 6) {
        nextWeights = applyDelta(nextWeights, { skill: +0.10, fit: +0.10, balance: -0.10, scarcity: -0.10 });
        flags.round6ShiftDone = true;
      }

      return { ...state, round: newRound, weights: nextWeights, flags };
    }
    case 'PREV_ROUND': return { ...state, round: Math.max(1, state.round - 1) };
    default: return state;
  }
}

export function useDraftState() {
  return useReducer(reducer, initialState);
}

function clamp01(n: number) { return Math.max(0, Math.min(1, n)); }
function normalize(w: DraftState['weights']): DraftState['weights'] {
  const sum = w.skill + w.fit + w.balance + w.scarcity || 1;
  return {
    skill: clamp01(w.skill / sum),
    fit: clamp01(w.fit / sum),
    balance: clamp01(w.balance / sum),
    scarcity: clamp01(w.scarcity / sum),
  };
}
function applyDelta(w: DraftState['weights'], d: Partial<DraftState['weights']>): DraftState['weights'] {
  const next = {
    skill: Math.max(0, w.skill + (d.skill ?? 0)),
    fit: Math.max(0, w.fit + (d.fit ?? 0)),
    balance: Math.max(0, w.balance + (d.balance ?? 0)),
    scarcity: Math.max(0, w.scarcity + (d.scarcity ?? 0)),
  };
  return normalize(next);
}
function totalTargets(t: Record<Pos, number>) { return Object.values(t).reduce((a,b)=>a+b,0); }
function totalHave(state: DraftState) {
  const roster = new Set(state.yourRosterIds);
  let count = 0;
  for (const p of state.players) if (roster.has(p.id)) count++;
  return count;
}