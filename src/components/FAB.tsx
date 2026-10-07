import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Fuel, Wrench, Gauge, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { actions } from '@/mockData';
import { useStore } from '@/store';

const iconMap: Record<string, LucideIcon> = {
  Fuel,
  Wrench,
  Gauge,
};

export default function FAB() {
  const [open, setOpen] = useState(false);
  const { performAction } = useStore();

  const handleAction = (id: string) => {
    performAction(id);
    setOpen(false);
  };

  const actionList = Object.values(actions);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-stone-900/30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Action Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <div className="max-w-md mx-auto bg-white rounded-t-[28px] pb-6 shadow-2xl">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1.5 bg-stone-200 rounded-full" />
              </div>
              <div className="flex items-center justify-between px-5 pb-4">
                <h3 className="text-base font-semibold text-stone-800">Быстрое действие</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors"
                >
                  <X className="w-4 h-4 text-stone-500" />
                </button>
              </div>
              <div className="space-y-1 px-3">
                {actionList.map((action) => {
                  const Icon = iconMap[action.icon] ?? Plus;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action.id)}
                      className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-stone-50 transition-colors text-left"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" strokeWidth={2} />
                      </div>
                      <span className="text-[15px] font-medium text-stone-700">
                        {action.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-600/30 flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
        </motion.div>
      </motion.button>
    </>
  );
}
