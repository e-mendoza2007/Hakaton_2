import type { StoryStage, StorySectorSummary } from '../../types';

interface StoryVisualProps {
  stage: StoryStage | null;
  sector: StorySectorSummary;
}

export function StoryVisual({ stage, sector }: StoryVisualProps) {
  const bgColor = stage?.colorToken ?? 'from-gray-800 to-gray-900';
  const assetKey = stage?.assetKey ?? 'default';

  return (
    <div
      className={`sticky top-20 w-full h-48 sm:h-64 rounded-lg bg-gradient-to-br ${bgColor} flex items-center justify-center transition-all duration-700 overflow-hidden`}
    >
      <div className="text-center">
        <div className="text-4xl mb-2 transition-all duration-500" data-asset={assetKey}>
          {assetKey === 'peace' && '🌿'}
          {assetKey === 'warning' && '⚠️'}
          {assetKey === 'danger' && '🔥'}
          {assetKey === 'chaos' && '💥'}
          {assetKey === 'recovery' && '💚'}
          {assetKey === 'crisis' && '🚨'}
          {assetKey === 'growth' && '🌱'}
          {assetKey === 'balance' && '⚖️'}
          {!['peace','warning','danger','chaos','recovery','crisis','growth','balance'].includes(assetKey) && '🌀'}
        </div>
        {stage && (
          <div className="text-sm text-white/80">
            <p>{sector.name} - {stage.title}</p>
          </div>
        )}
        {!stage && (
          <div className="text-sm text-white/80">
            <p>{sector.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
