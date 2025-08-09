import Card from './Card';
import type { Player, Pos } from '../lib/types';

export function RecommendationsTable({
  rows,
  onPickYou,
  onPickOther,
}: {
  rows: { player: Player; score: number; assumedPos: Pos }[];
  onPickYou: (id: string) => void;
  onPickOther: (id: string) => void;
}) {
  return (
    <Card title="Top Recommendations">
      <table className="w-full text-sm">
        <thead className="text-neutral-400">
          <tr className="text-left">
            <th className="pb-2 font-medium">Player</th>
            <th className="pb-2 font-medium">Pos</th>
            <th className="pb-2 font-medium">2nd</th>
            <th className="pb-2 font-medium">Least</th>
            <th className="pb-2 font-medium">Skill</th>
            <th className="pb-2 font-medium">Fit</th>
            <th className="pb-2 font-medium">Score</th>
            <th className="pb-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.slice(0, 25).map((row) => (
            <tr key={row.player.id} className="hover:bg-white/5">
              <td className="py-2">{row.player.name}</td>
              <td className="py-2">{row.assumedPos}</td>
              <td className="py-2">{row.player.positions.secondary ?? '-'}</td>
              <td className="py-2">{row.player.positions.tertiary ?? '-'}</td>
              <td className="py-2">{row.player.skill}</td>
              <td className="py-2">{row.player.fit}</td>
              <td className="py-2">{row.score.toFixed(3)}</td>
              <td className="py-2">
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-xs ring-1 ring-emerald-400/40 rounded hover:bg-emerald-400/10"
                    onClick={()=>onPickYou(row.player.id)}>Pick</button>
                  <button className="px-2 py-1 text-xs ring-1 ring-orange-400/40 rounded hover:bg-orange-400/10"
                    onClick={()=>onPickOther(row.player.id)}>Taken</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}