import Card from './Card';
import type { Pos, Weights } from '../lib/types';

const POS: Pos[] = ['S','OH','MB','OPP','L'];

export function ControlsPanel({
  weights,
  targets,
  onChangeWeights,
  onIncTarget,
  onDecTarget,
}: {
  weights: Weights;
  targets: Record<Pos, number>;
  onChangeWeights: (w: Partial<Weights>) => void;
  onIncTarget: (p: Pos) => void;
  onDecTarget: (p: Pos) => void;
}) {
  return (
    <div className="space-y-6">
      <Card title="Weights">
        {(['skill','fit','balance','scarcity'] as const).map(k => (
          <div key={k} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="capitalize">{k}</span>
              <span className="text-neutral-400">{Math.round(weights[k]*100)}</span>
            </div>
            <input
              type="range" min={0} max={100} value={Math.round(weights[k]*100)}
              onChange={e => onChangeWeights({ [k]: Number(e.target.value)/100 })}
              className="w-full"
            />
          </div>
        ))}
        <p className="text-xs text-neutral-500 mt-1">Weights auto-normalize when scoring.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
  <button
    className="px-2 py-1 text-xs ring-1 ring-white/15 rounded hover:bg-white/10"
    onClick={() => onChangeWeights({ skill: 0.40, fit: 0.25, balance: 0.20, scarcity: 0.15 })}
  >Best Available</button>
  <button
    className="px-2 py-1 text-xs ring-1 ring-white/15 rounded hover:bg-white/10"
    onClick={() => onChangeWeights({ skill: 0.20, fit: 0.15, balance: 0.40, scarcity: 0.25 })}
  >Setter Hunt</button>
  <button
    className="px-2 py-1 text-xs ring-1 ring-white/15 rounded hover:bg-white/10"
    onClick={() => onChangeWeights({ fit: 0.40, skill: 0.25, balance: 0.20, scarcity: 0.15 })}
  >Chemistry Pick</button>
  <button
    className="px-2 py-1 text-xs ring-1 ring-white/15 rounded hover:bg-white/10"
    onClick={() => onChangeWeights({ balance: 0.45, scarcity: 0.20, skill: 0.20, fit: 0.15 })}
  >Fill Gaps</button>
</div>
      </Card>

      <Card title="Position Targets">
        <div className="grid grid-cols-5 gap-2">
          {POS.map(pos => (
            <div key={pos} className="rounded bg-white/5 p-2 text-center">
              <div className="text-xs text-neutral-400">{pos}</div>
              <div className="text-lg font-semibold">{targets[pos]}</div>
              <div className="flex justify-center gap-2 mt-1">
                <button className="px-2 py-0.5 text-sm ring-1 ring-white/15 rounded hover:bg-white/10"
                  onClick={()=>onDecTarget(pos)}>–</button>
                <button className="px-2 py-0.5 text-sm ring-1 ring-white/15 rounded hover:bg-white/10"
                  onClick={()=>onIncTarget(pos)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}