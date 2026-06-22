import type { SignalDTO } from '../../types';
import { SEVERITY_COLORS, SIGNAL_STATUS_COLORS } from '../../utils/constants';

interface SignalCardProps {
  signal: SignalDTO;
  onClick?: () => void;
}

export function SignalCard({ signal, onClick }: SignalCardProps) {
  return (
    <div
      className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-cyan-600 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-100 text-sm">{signal.rawContent}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${SEVERITY_COLORS[signal.severity]}`}>
          {signal.severity}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
        <span>{signal.signalType}</span>
        <span>·</span>
        <span>{signal.tropel.name}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className={`px-2 py-0.5 rounded-full ${SIGNAL_STATUS_COLORS[signal.status]}`}>
          {signal.status}
        </span>
        <span className="text-gray-500">
          {new Date(signal.createdAt).toLocaleString('es-ES')}
        </span>
      </div>
    </div>
  );
}
