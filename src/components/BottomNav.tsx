import { Home, Receipt, Package, Wrench, User, type LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: 'garage', label: 'Гараж', icon: Home },
  { id: 'expenses', label: 'Расходы', icon: Receipt },
  { id: 'parts', label: 'Запчасти', icon: Package },
  { id: 'service', label: 'Сервис', icon: Wrench },
  { id: 'profile', label: 'Профиль', icon: User },
];

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-4 left-0 right-0 z-40 px-4">
      <div className="max-w-md mx-auto backdrop-blur-xl bg-white/80 rounded-[24px] border border-white/30 shadow-lg shadow-stone-200/40 px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-colors min-w-[56px]"
              >
                <Icon
                  className={`w-5.5 h-5.5 transition-colors ${
                    isActive ? 'text-blue-700' : 'text-stone-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? 'text-blue-700' : 'text-stone-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
