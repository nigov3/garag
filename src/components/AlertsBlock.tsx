import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { useStore } from '@/store';

export default function AlertsBlock() {
  const { alerts } = useStore();

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {alerts.map((alert, i) => {
        const isCritical = alert.level === 'critical';
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.08 }}
            className={`flex items-center gap-3 p-3.5 rounded-[20px] border ${
              isCritical
                ? 'bg-red-50 border-red-200/60'
                : 'bg-amber-50 border-amber-200/60'
            }`}
          >
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                isCritical ? 'bg-red-100' : 'bg-amber-100'
              }`}
            >
              {isCritical ? (
                <ShieldAlert className="w-5 h-5 text-red-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold ${isCritical ? 'text-red-700' : 'text-amber-700'}`}>
                {isCritical ? 'Критично' : 'Внимание'}
              </p>
              <p className={`text-sm ${isCritical ? 'text-red-600' : 'text-amber-600'} leading-snug`}>
                {alert.message}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
