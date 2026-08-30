import React from 'react';
import { useStore } from '../context/StoreContext';
import { Check, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="pointer-events-auto flex items-center justify-between p-4 bg-[#FFFFFF] border border-[#E0DFD8] text-[#141414] shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center space-x-3 pr-2">
              {toast.type === 'success' && (
                <div className="w-6 h-6 rounded-full bg-[#141414] text-[#F5F5F0] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-6 h-6 rounded-full bg-[#ECECE7] text-[#141414] flex items-center justify-center flex-shrink-0">
                  <Info className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 border border-red-300 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="text-xs font-semibold tracking-wide uppercase leading-snug text-[#141414]">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#706E6B] hover:text-[#141414] transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
