import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CarPart, Alert } from './types';
import { mockCar, mockParts, mockAlerts, actions } from './mockData';

interface StoreState {
  car: typeof mockCar;
  parts: CarPart[];
  alerts: Alert[];
  performAction: (actionId: string) => void;
}

const StoreContext = createContext<StoreState | null>(null);

const computeStatus = (resource: number): CarPart['status'] => {
  if (resource < 20) return 'critical';
  if (resource < 50) return 'warning';
  return 'healthy';
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [car] = useState(mockCar);
  const [parts, setParts] = useState<CarPart[]>(mockParts);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const performAction = (actionId: string) => {
    const action = actions[actionId];
    if (!action) return;

    setParts((prev) =>
      prev.map((part) => {
        const trigger = action.triggers.find((t) => t.part === part.id);
        if (!trigger) return part;

        let newResource = part.resource;
        if (trigger.reset_to !== undefined) {
          newResource = trigger.reset_to;
        }
        if (trigger.decrease_by !== undefined) {
          newResource = Math.max(0, part.resource - trigger.decrease_by);
        }

        return {
          ...part,
          resource: Math.min(100, Math.round(newResource * 10) / 10),
          status: computeStatus(newResource),
        };
      })
    );

    // Update alerts based on new part states
    setParts((currentParts) => {
      const newAlerts: Alert[] = currentParts
        .filter((p) => p.resource < 20)
        .map((p) => ({
          id: p.id,
          message:
            p.resource < 10
              ? `Ресурс ${p.name.toLowerCase()} менее 10%`
              : `Ресурс ${p.name.toLowerCase()} менее 20%. Рекомендуется замена`,
          level: p.resource < 10 ? 'critical' : 'warning',
        }));
      setAlerts(newAlerts);
      return currentParts;
    });
  };

  return (
    <StoreContext.Provider value={{ car, parts, alerts, performAction }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
