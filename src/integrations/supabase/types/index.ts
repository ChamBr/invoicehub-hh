export * from './database';
export type { Json } from './common';
export type {
  TypedSupabaseClient,
  Tables,
  Enums,
  TablesInsert,
  TablesUpdate,
} from './common';

// Re-export com nomes específicos para evitar ambiguidade
export type { Profile as UserProfile } from './tables/user';
export type { SubscriberUser as SubscriberUserType } from './tables/subscriber';
export type { Subscriber as SubscriberType } from './tables/subscriber';
export type { UserDashboardMetrics as UserDashboardMetricsType } from './tables/user';