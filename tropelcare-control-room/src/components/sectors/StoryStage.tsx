import type { StoryStage as StoryStageType } from '../../types';

interface StoryStageProps {
  stage: StoryStageType;
  isActive: boolean;
  index: number;
}

export function StoryStage({ stage, isActive, index }: StoryStageProps) {
  return (
    <section
      id={`stage-${stage.order}`}
      data-stage={stage.order}
      className="min-h-[80vh] flex flex-col justify-center py-16 px-4 scroll-mt-20"
      style={{
        viewTimelineName: `--stage-${stage.order}`,
      }}
    >
      <div
        className={`max-w-2xl mx-auto transition-all duration-700 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'
        }`}
      >
        <span className="text-xs text-gray-500 font-mono mb-2 block">
          Etapa {index + 1} / 8
        </span>
        <h3 className="text-2xl font-bold mb-3">{stage.title}</h3>
        <p className="text-gray-300 leading-relaxed">{stage.narrative}</p>
      </div>
    </section>
  );
}
