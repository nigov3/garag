import { motion } from 'framer-motion';
import { Fuel, Wallet, type LucideIcon } from 'lucide-react';
import { mockStats } from '@/mockData';
import type { StatItem } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  Fuel,
  Wallet,
};

const accentMap: Record<StatItem['accent'], { bg: string; text: string; ring: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
};

export default function Statistics() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {mockStats.map((stat, i) => {
        const Icon = iconMap[stat.icon] ?? Wallet;
        const accent = accentMap[stat.accent];
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="bg-white rounded-[24px] p-4 shadow-sm hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300"
          >
            <div className={`w-10 h-10 rounded-2xl ${accent.bg} flex items-center justify-center mb-2.5 ring-1 ${accent.ring}`}>
              <Icon className={`w-5 h-5 ${accent.text}`} strokeWidth={2} />
            </div>
            <p className="text-[15px] font-semibold text-stone-800 leading-tight">
              {stat.value}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
