import { useEffect, useState } from 'react';
import type { SignalDetailDTO, SignalStatus } from '../../types';
import { signalService } from '../../services/signalService';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Spinner } from '../common/Spinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { SIGNAL_STATUS_COLORS, SEVERITY_COLORS } from '../../utils/constants';

interface SignalDetailProps {
  signalId: string;
  open: boolean;
  onClose: () => void;
  onStatusChange?: (id: string, newStatus: SignalStatus) => void;
}

export function SignalDetail({ signalId, open, onClose, onStatusChange }: SignalDetailProps) {
  const [data, setData] = useState<SignalDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    signalService.getById(signalId)
      .then((res) => setData(res.data))
      .catch(() => setError('Error al cargar la señal'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (open) {
      setUpdateError(null);
      setSuccessMsg(null);
      load();
    }
  }, [signalId, open]);

  const handleStatusUpdate = async (newStatus: 'PROCESANDO' | 'ATENDIDA') => {
    if (!data) return;
    setUpdating(true);
    setUpdateError(null);
    setSuccessMsg(null);
    try {
      await signalService.updateStatus(signalId, newStatus);
      setData({ ...data, status: newStatus });
      setSuccessMsg(`Señal marcada como ${newStatus}`);
      onStatusChange?.(signalId, newStatus);
    } catch {
      setUpdateError('Error al actualizar el estado');
    } finally {
      setUpdating(false);
    }
  };

  const nextStatus = data?.status === 'RECIBIDA' ? 'PROCESANDO' : data?.status === 'PROCESANDO' ? 'ATENDIDA' : null;

  return (
    <Modal open={open} onClose={onClose} title="Detalle de Señal">
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onRetry={load} />}
      {data && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{data.rawContent}</h3>
            {data.description && <p className="text-sm text-gray-400 mt-1">{data.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Tipo:</span>
              <p className="text-gray-200">{data.signalType}</p>
            </div>
            <div>
              <span className="text-gray-500">Severidad:</span>
              <p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${SEVERITY_COLORS[data.severity]}`}>
                  {data.severity}
                </span>
              </p>
            </div>
            <div>
              <span className="text-gray-500">Estado:</span>
              <p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${SIGNAL_STATUS_COLORS[data.status]}`}>
                  {data.status}
                </span>
              </p>
            </div>
            <div>
              <span className="text-gray-500">Tropel:</span>
              <p className="text-gray-200">{data.tropel.name}</p>
            </div>
            <div>
              <span className="text-gray-500">Creada:</span>
              <p className="text-gray-200">{new Date(data.createdAt).toLocaleString('es-ES')}</p>
            </div>
          </div>

          {data.metadata && Object.keys(data.metadata).length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-1">Metadatos</h4>
              <div className="text-xs text-gray-500 space-y-1">
                {Object.entries(data.metadata).map(([key, val]) => (
                  <p key={key}><span className="text-gray-400">{key}:</span> {val}</p>
                ))}
              </div>
            </div>
          )}

          {successMsg && (
            <p className="text-green-400 text-sm">{successMsg}</p>
          )}

          {updateError && (
            <ErrorMessage message={updateError} />
          )}

          {nextStatus && (
            <div className="pt-2">
              <Button
                onClick={() => handleStatusUpdate(nextStatus)}
                loading={updating}
                disabled={updating}
              >
                Marcar como {nextStatus}
              </Button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
