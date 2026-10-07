export type PartStatus = 'healthy' | 'warning' | 'critical';

export interface CarPart {
  id: string;
  name: string;
  resource: number;
  unit: string;
  status: PartStatus;
  dotPosition: { top: string; left: string };
}

export interface Alert {
  id: string;
  message: string;
  level: 'warning' | 'critical';
}

export interface UrgentTask {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accent: 'blue' | 'red' | 'amber' | 'emerald';
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  icon: string;
  accent: 'emerald' | 'amber';
}

export interface Trigger {
  part: string;
  reset_to?: number;
  decrease_by?: number;
}

export interface Action {
  id: string;
  name: string;
  icon: string;
  triggers: Trigger[];
}

export interface Car {
  name: string;
  plate: string;
  image: string;
  mileage: number;
}

export const getStatusLabel = (status: PartStatus): string => {
  switch (status) {
    case 'healthy':
      return 'Здоров';
    case 'warning':
      return 'Требует внимания';
    case 'critical':
      return 'Критично';
  }
};

export const getStatusColor = (status: PartStatus): string => {
  switch (status) {
    case 'healthy':
      return 'text-emerald-600';
    case 'warning':
      return 'text-amber-600';
    case 'critical':
      return 'text-red-600';
  }
};

export const getBarColor = (status: PartStatus): string => {
  switch (status) {
    case 'healthy':
      return 'bg-emerald-500';
    case 'warning':
      return 'bg-amber-500';
    case 'critical':
      return 'bg-red-500';
  }
};

export const getDotColor = (status: PartStatus): string => {
  switch (status) {
    case 'healthy':
      return 'bg-emerald-500';
    case 'warning':
      return 'bg-amber-500';
    case 'critical':
      return 'bg-red-500';
  }
};
