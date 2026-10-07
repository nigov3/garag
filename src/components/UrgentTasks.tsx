import { motion } from 'framer-motion';
import { ShieldAlert, FileText, Wrench, Receipt, type LucideIcon } from 'lucide-react';
import { mockTasks } from '@/mockData';
import type { UrgentTask } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  ShieldAlert,
  FileText,
  Wrench,
  Receipt,
};

const accentMap: Record<UrgentTask['accent'], { bg: string; text: string; ring: string }> = {
  red: { bg: 'bg-red-50', text: 'text-red-600', ring: 'ring-red-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
};

export default function UrgentTasks() {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth-x -mx-5 px-5">
      {mockTasks.map((task, i) => {
        const Icon = iconMap[task.icon] ?? FileText;
        const accent = accentMap[task.accent];
        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="flex-shrink-0 w-[200px] bg-white rounded-[24px] p-4 shadow-sm hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300 cursor-pointer"
          >
            <div className={`w-11 h-11 rounded-2xl ${accent.bg} flex items-center justify-center mb-3 ring-1 ${accent.ring}`}>
              <Icon className={`w-5.5 h-5.5 ${accent.text}`} strokeWidth={2} />
            </div>
            <p className="text-sm font-semibold text-stone-800 leading-snug mb-1">
              {task.title}
            </p>
            <p className="text-xs text-stone-500 leading-snug">
              {task.subtitle}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
