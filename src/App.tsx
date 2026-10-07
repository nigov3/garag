import { motion } from 'framer-motion';
import { useStore } from '@/store';
import Header from '@/components/Header';
import CarZone from '@/components/CarZone';
import AlertsBlock from '@/components/AlertsBlock';
import UrgentTasks from '@/components/UrgentTasks';
import Statistics from '@/components/Statistics';
import BottomNav from '@/components/BottomNav';
import FAB from '@/components/FAB';
import { StoreProvider } from '@/store';
import { useState } from 'react';

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-base font-semibold text-stone-800">{title}</h2>
      {action && (
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
          {action}
        </button>
      )}
    </div>
  );
}

function GaragePage() {
  return (
    <div className="space-y-5">
      <CarZone />
      <AlertsBlock />
      <div>
        <SectionTitle title="Срочные дела" action="Все" />
        <UrgentTasks />
      </div>
      <div>
        <SectionTitle title="Статистика" />
        <Statistics />
      </div>
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mb-4">
        <span className="text-2xl text-stone-400">🚗</span>
      </div>
      <h2 className="text-lg font-semibold text-stone-700 mb-1">{title}</h2>
      <p className="text-sm text-stone-400">Этот раздел скоро будет доступен</p>
    </div>
  );
}

function AppContent() {
  const { alerts } = useStore();
  const [activeNav, setActiveNav] = useState('garage');

  const navTitles: Record<string, string> = {
    garage: 'Гараж',
    expenses: 'Расходы',
    parts: 'Запчасти',
    service: 'Сервис',
    profile: 'Профиль',
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] relative">
      <Header />
      <main className="max-w-md mx-auto px-5 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeNav === 'garage' ? <GaragePage /> : <PlaceholderPage title={navTitles[activeNav]} />}
        </motion.div>
      </main>
      <FAB />
      <BottomNav active={activeNav} onChange={setActiveNav} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
