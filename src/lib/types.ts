export type Pos = 'S' | 'OH' | 'MB' | 'OPP' | 'L' | 'U';

export interface Player {
  id: string;
  name: string;
  positions: { primary: Pos; secondary?: Pos; tertiary?: Pos };
  skill: number; // 0..10
  fit: number;   // 0..10
}

export interface Weights {
  skill: number;
  fit: number;
  balance: number;
  scarcity: number;
}

export interface DraftState {
  players: Player[];
  yourRosterIds: string[];
  takenByOthers: Set<string>;
  round: number;
  targets: Record<Pos, number>;
  weights: Weights;
  stats?: { othersSettersTaken: number };
  flags?: {
    seventyFiveShiftDone?: boolean;
    round6ShiftDone?: boolean;
    othersSetterShiftDone?: boolean;
  };
}