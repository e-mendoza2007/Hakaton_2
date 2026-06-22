import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { StorySectorSummary, StoryStage } from '../types';
import { sectorService } from '../services/sectorService';
import { SectorStoryView } from '../components/sectors/SectorStory';

export function SectorStory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sector, setSector] = useState<StorySectorSummary | null>(null);
  const [stages, setStages] = useState<StoryStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    sectorService.story(id)
      .then((res) => {
        setSector(res.data.sector);
        setStages(res.data.stages);
      })
      .catch(() => setError('Error al cargar la historia del sector'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);

  if (!id) {
    return <p className="text-gray-500 text-center py-8">Sector no encontrado</p>;
  }

  return (
    <SectorStoryView
      sector={sector ?? { id: '', name: '', climate: 'PIXEL_FOREST' }}
      stages={stages}
      loading={loading}
      error={error}
      onRetry={load}
      onBack={() => navigate('/sectors')}
    />
  );
}
