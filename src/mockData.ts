import type { Car, CarPart, Alert, UrgentTask, StatItem, Action } from './types';

export const mockCar: Car = {
  name: 'Kia Rio',
  plate: 'А123БВ77',
  image: 'https://images.pexels.com/photos/11501948/pexels-photo-11501948.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mileage: 84500,
};

export const mockParts: CarPart[] = [
  {
    id: 'engine',
    name: 'Двигатель',
    resource: 82,
    unit: '%',
    status: 'healthy',
    dotPosition: { top: '35%', left: '48%' },
  },
  {
    id: 'brake_pads',
    name: 'Тормозные колодки',
    resource: 8,
    unit: '%',
    status: 'critical',
    dotPosition: { top: '62%', left: '22%' },
  },
  {
    id: 'motor_oil',
    name: 'Моторное масло',
    resource: 45,
    unit: '%',
    status: 'healthy',
    dotPosition: { top: '38%', left: '55%' },
  },
  {
    id: 'oil_filter',
    name: 'Масляный фильтр',
    resource: 45,
    unit: '%',
    status: 'healthy',
    dotPosition: { top: '42%', left: '38%' },
  },
  {
    id: 'tires',
    name: 'Шины',
    resource: 18,
    unit: '%',
    status: 'critical',
    dotPosition: { top: '75%', left: '18%' },
  },
  {
    id: 'battery',
    name: 'Аккумулятор',
    resource: 65,
    unit: '%',
    status: 'healthy',
    dotPosition: { top: '30%', left: '68%' },
  },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    message: 'Ресурс тормозных колодок менее 10%',
    level: 'critical',
  },
  {
    id: '2',
    message: 'Ресурс шин менее 20%. Рекомендуется замена',
    level: 'warning',
  },
];

export const mockTasks: UrgentTask[] = [
  {
    id: '1',
    title: 'ОСАГО истекает через 5 дней',
    subtitle: 'Срочно продлите полис',
    icon: 'ShieldAlert',
    accent: 'red',
  },
  {
    id: '2',
    title: 'Новый штраф 500₽',
    subtitle: 'От 14 сентября 2026',
    icon: 'FileText',
    accent: 'amber',
  },
  {
    id: '3',
    title: 'ТО через 1000 км',
    subtitle: 'Текущий пробег: 84 500 км',
    icon: 'Wrench',
    accent: 'blue',
  },
  {
    id: '4',
    title: 'Налог за 2026 год',
    subtitle: 'Оплатить до 1 декабря',
    icon: 'Receipt',
    accent: 'emerald',
  },
];

export const mockStats: StatItem[] = [
  {
    id: '1',
    label: 'Средний расход',
    value: '8.2 л/100км',
    icon: 'Fuel',
    accent: 'emerald',
  },
  {
    id: '2',
    label: 'Расходы в этом месяце',
    value: '15 400 ₽',
    icon: 'Wallet',
    accent: 'amber',
  },
];

export const actions: Record<string, Action> = {
  refuel: {
    id: 'refuel',
    name: 'Добавить заправку',
    icon: 'Fuel',
    triggers: [
      { part: 'motor_oil', decrease_by: 2 },
      { part: 'engine_resource', decrease_by: 0.05 },
    ],
  },
  maintenance: {
    id: 'maintenance',
    name: 'Добавить расход/ТО',
    icon: 'Wrench',
    triggers: [
      { part: 'motor_oil', reset_to: 100 },
      { part: 'oil_filter', reset_to: 100 },
      { part: 'engine_resource', decrease_by: 0.1 },
    ],
  },
  mileage: {
    id: 'mileage',
    name: 'Зафиксировать пробег',
    icon: 'Gauge',
    triggers: [
      { part: 'tires', decrease_by: 1 },
      { part: 'brake_pads', decrease_by: 0.5 },
    ],
  },
};
