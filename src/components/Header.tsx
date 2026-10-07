import { Bell } from 'lucide-react';
import { useStore } from '@/store';

export default function Header() {
  const { car } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/20">
      <div className="flex items-center justify-between px-5 py-3.5 max-w-md mx-auto">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center text-stone-600 font-semibold text-sm shadow-sm">
          ИП
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[15px] font-semibold text-stone-800 leading-tight">
            {car.name}
          </span>
          <span className="text-xs text-stone-500 font-medium tracking-wide mt-0.5">
            {car.plate}
          </span>
        </div>
        <button className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors">
          <Bell className="w-5 h-5 text-stone-600" strokeWidth={2} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white/80" />
        </button>
      </div>
    </header>
  );
}
