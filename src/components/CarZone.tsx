import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store';
import { getDotColor, getBarColor, getStatusLabel, getStatusColor, type CarPart } from '@/types';

export default function CarZone() {
  const { car, parts } = useStore();
  const [selected, setSelected] = useState<CarPart | null>(null);

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-stone-100 shadow-sm">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Dots */}
        {parts.map((part) => (
          <button
            key={part.id}
            className="absolute z-10 group"
            style={{ top: part.dotPosition.top, left: part.dotPosition.left }}
            onClick={() => setSelected(part)}
          >
            <span className="absolute -inset-3 rounded-full" />
            <span
              className={`block w-3.5 h-3.5 rounded-full ${getDotColor(part.status)} ring-2 ring-white/90 shadow-md animate-pulse-dot`}
            />
          </button>
        ))}

        {/* Mileage badge */}
        <div className="absolute bottom-3 left-3 backdrop-blur-md bg-white/70 rounded-full px-3 py-1.5 flex items-center gap-1.5">
          <span className="text-xs font-medium text-stone-500">Пробег</span>
          <span className="text-sm font-semibold text-stone-800">{car.mileage.toLocaleString('ru-RU')} км</span>
        </div>
      </div>

      {/* Popover */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 top-4 left-1/2 -translate-x-1/2 w-[85%] max-w-xs bg-white rounded-2xl shadow-xl shadow-stone-300/40 p-4 border border-stone-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-stone-800 text-[15px]">{selected.name}</span>
              <button
                onClick={() => setSelected(null)}
                className="text-stone-400 hover:text-stone-600 text-lg leading-none"
              >
                ×
              </button>
            </div>
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-stone-500">Ресурс</span>
                <span className="text-xs font-semibold text-stone-700">
                  {selected.resource}{selected.unit}
                </span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selected.resource}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full ${getBarColor(selected.status)}`}
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-2 h-2 rounded-full ${getDotColor(selected.status)}`} />
              <span className={`text-xs font-medium ${getStatusColor(selected.status)}`}>
                {getStatusLabel(selected.status)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
