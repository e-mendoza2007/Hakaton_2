import { useState, useEffect, useRef, useCallback } from 'react';
import type { StorySectorSummary, StoryStage } from '../../types';
import { StoryStage as StageComponent } from './StoryStage';
import { StoryVisual } from './StoryVisual';
import { Spinner } from '../common/Spinner';
import { ErrorMessage } from '../common/ErrorMessage';

interface SectorStoryProps {
  sector: StorySectorSummary;
  stages: StoryStage[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onBack: () => void;
}

export function SectorStoryView({ sector, stages, loading, error, onRetry, onBack }: SectorStoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => {
        const aIdx = Number(a.target.getAttribute('data-stage'));
        const bIdx = Number(b.target.getAttribute('data-stage'));
        return aIdx - bIdx;
      });

    if (visible.length > 0) {
      const idx = stages.findIndex((s) => s.order === Number(visible[0].target.getAttribute('data-stage')));
      if (idx >= 0) setActiveIndex(idx);
    }
  }, [stages]);

  useEffect(() => {
    const refs = stageRefs.current.filter(Boolean) as HTMLElement[];
    if (refs.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: prefersReducedMotion ? '0px' : '-40% 0px -40% 0px',
      threshold: prefersReducedMotion ? 0.5 : 0,
    });

    refs.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [handleIntersection, stages]);

  const scrollToStage = (index: number) => {
    const el = stageRefs.current[index];
    el?.scrollIntoView({ behavior: 'smooth' });
    setActiveIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToStage(index);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;

  const currentStage = stages[activeIndex] ?? null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-sm text-cyan-400 hover:underline"
        >
          &larr; Volver a sectores
        </button>
      </div>

      {/* Sector summary */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 view-transition-sector">
        <h2 className="text-xl font-bold">{sector.name}</h2>
        <p className="text-sm text-gray-400">{sector.sectorCode ?? ''} · {sector.climate}</p>
        <div className="flex gap-4 mt-2 text-xs text-gray-500">
          <span>Capacidad: {sector.currentLoad ?? '?'}/{sector.capacity ?? '?'}</span>
          <span>Estabilidad: {sector.stabilityLevel?.toFixed(1) ?? '?'}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="sticky top-16 z-10 bg-gray-900/90 backdrop-blur py-2">
        <div className="flex gap-1">
          {stages.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToStage(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`flex-1 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                i <= activeIndex ? 'bg-cyan-500' : 'bg-gray-700'
              }`}
              aria-label={`Ir a etapa ${i + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-1">
          Etapa {activeIndex + 1} de {stages.length}
        </p>
      </div>

      {/* Visual panel */}
      <StoryVisual stage={currentStage} sector={sector} />

      {/* Stage metrics */}
      {currentStage && (
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-gray-800 border border-gray-700 rounded p-3 text-center">
            <p className="text-gray-400 text-xs">Estabilidad</p>
            <p className="text-cyan-400 font-bold text-lg">{currentStage.metrics.stability.toFixed(1)}</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded p-3 text-center">
            <p className="text-gray-400 text-xs">Energía</p>
            <p className="text-yellow-400 font-bold text-lg">{currentStage.metrics.energy.toFixed(1)}</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded p-3 text-center">
            <p className="text-gray-400 text-xs">Alertas</p>
            <p className="text-red-400 font-bold text-lg">{currentStage.metrics.alerts}</p>
          </div>
        </div>
      )}

      {/* Story stages */}
      <div className="space-y-0">
        {stages.map((stage, i) => (
          <div
            key={stage.order}
            ref={(el) => { stageRefs.current[i] = el; }}
          >
            <StageComponent
              stage={stage}
              isActive={i === activeIndex}
              index={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
