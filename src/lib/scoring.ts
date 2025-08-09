import type { DraftState, Player, Pos } from './types';

const POSITION_PREF: Record<'primary' | 'secondary' | 'tertiary', number> = {
  primary: 1.0,
  secondary: 0.8,
  tertiary: 0.6,
};

const POSITIONS: Pos[] = ['S','OH','MB','OPP','L','U'];

const POS_SCARCITY_MULTIPLIER: Record<Pos, number> = {
  S: 2.0,   // Setters extremely rare
  L: 1.5,   // Liberos somewhat rare
  MB: 1.3,  // Middles less popular
  OH: 1.0,  // Outsides common
  OPP: 1.2, // Right side often overlooked
  U: 1.0,   // Universal players are common
};

export function normalizeWeights(w: DraftState['weights']) {
  const sum = w.skill + w.fit + w.balance + w.scarcity || 1;
  return {
    skill: w.skill / sum,
    fit: w.fit / sum,
    balance: w.balance / sum,
    scarcity: w.scarcity / sum,
  };
}

function minMax(nums: number[]) {
  const min = Math.min(...nums), max = Math.max(...nums);
  const span = Math.max(1, max - min);
  return (v: number) => (v - min) / span; // 0..1
}

function sigmoid(x: number, k = 1.2) {
  return 1 / (1 + Math.exp(-k * x));
}

function countRosterByPos(state: DraftState): Record<Pos, number> {
  const byPos: Record<Pos, number> = { S:0, OH:0, MB:0, OPP:0, L:0, U:0 };
  const roster = new Set(state.yourRosterIds);
  for (const p of state.players) if (roster.has(p.id)) byPos[p.positions.primary]++;
  return byPos;
}

function needsByPos(state: DraftState): Record<Pos, number> {
  const have = countRosterByPos(state);
  return Object.fromEntries(
    (Object.keys(have) as Pos[]).map(pos => [pos, state.targets[pos] - have[pos]])
  ) as Record<Pos, number>;
}

function scarcityByPos(state: DraftState): Record<Pos, number> {
  const taken = new Set([...state.takenByOthers, ...state.yourRosterIds]);
  const result: Record<Pos, number> = { S:0, OH:0, MB:0, OPP:0, L:0, U:0 };
  for (const pos of POSITIONS) {
    const avail = state.players.filter(p =>
      !taken.has(p.id) && (
        p.positions.primary === pos || p.positions.secondary === pos || p.positions.tertiary === pos
      )
    );
    if (avail.length === 0) { result[pos] = 1; continue; }
    const sorted = [...avail].sort((a,b)=>b.skill-a.skill);
    const topCount = Math.max(1, Math.floor(sorted.length * 0.2));
    const remainingTop = sorted.slice(0, topCount).length;
    result[pos] = 1 / (1 + remainingTop);
  }
  return result;
}

export function computeRecommendations(state: DraftState): { player: Player; score: number; assumedPos: Pos }[] {
  const taken = new Set([...state.takenByOthers, ...state.yourRosterIds]);
  const avail = state.players.filter(p => !taken.has(p.id));
  if (!avail.length) return [];

  const weight = normalizeWeights(state.weights);
  const skillScale = minMax(avail.map(p => p.skill));
  const fitScale   = minMax(avail.map(p => p.fit));
  const needs = needsByPos(state);
  const scarce = scarcityByPos(state);

  return avail.map(p => {
    const skill = skillScale(p.skill);
    const fit   = fitScale(p.fit);

    const candidates: { pos: Pos; prefKey: 'primary'|'secondary'|'tertiary' }[] = [];
    if (p.positions.primary)   candidates.push({ pos: p.positions.primary,   prefKey: 'primary' });
    if (p.positions.secondary) candidates.push({ pos: p.positions.secondary!, prefKey: 'secondary' });
    if (p.positions.tertiary)  candidates.push({ pos: p.positions.tertiary!,  prefKey: 'tertiary' });

    let best = { score: -Infinity, pos: candidates[0]?.pos as Pos };

    for (const c of candidates) {
      const bal = sigmoid(needs[c.pos]);
      const sca = scarce[c.pos];
      const pref = POSITION_PREF[c.prefKey];
      const s = (
        weight.skill * skill +
        weight.fit * fit +
        weight.balance * bal +
        weight.scarcity * (sca * POS_SCARCITY_MULTIPLIER[c.pos])
      ) * pref;
      if (s > best.score) best = { score: s, pos: c.pos };
    }

    return { player: p, score: best.score, assumedPos: best.pos };
  }).sort((a,b)=> b.score - a.score);
}