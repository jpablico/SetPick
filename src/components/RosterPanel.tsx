import Card from './Card';
import type { Player } from '../lib/types';

export function RosterPanel({
  players,
  yourRosterIds,
}: {
  players: Player[];
  yourRosterIds: string[];
}) {
  return (
    <Card title="Your Roster">
      <ul className="space-y-2">
        {yourRosterIds.length === 0 && (
          <li className="text-sm text-neutral-400">No picks yet.</li>
        )}
        {yourRosterIds.map(id => {
          const p = players.find(x => x.id === id)!;
          return (
            <li key={id} className="flex items-center justify-between bg-white/5 rounded px-2 py-1">
              <span>{p.name} <span className="text-neutral-400">({p.positions.primary})</span></span>
              <span className="text-neutral-400 text-xs">S{p.skill}/F{p.fit}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}