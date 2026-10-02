import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border transition-all duration-200 bg-white ${
              isWarning
                ? 'border-[#EF8E01] bg-[#EF8E01]/10 text-black'
                : isSuccess
                ? 'border-[#0038BD]/40 text-black'
                : 'border-black/15 text-black'
            }`}
          >
            <span className="shrink-0 mt-0.5">
              {isWarning ? (
                <AlertTriangle className="w-5 h-5 text-[#EF8E01]" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-[#0038BD]" />
              ) : (
                <Info className="w-5 h-5 text-black/70" />
              )}
            </span>

            <div className="grow min-w-0">
              <h4 className="text-sm font-semibold text-black">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-black/70 mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 text-black/40 hover:text-black rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
