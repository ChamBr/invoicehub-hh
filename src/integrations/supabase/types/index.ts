export * from './database';
export type { Json, TypedSupabaseClient, Table, TableInsert, TableUpdate } from './common';
export type { Tables } from './database/tables';

// Re-export com nomes específicos para evitar ambiguidade
export type { Profile as UserProfile } from './tables/user';
export type { SubscriberUser as SubscriberUserType } from './tables/subscriber';
export type { Subscriber as SubscriberType } from './tables/subscriber';
export type { UserDashboardMetrics as UserDashboardMetricsType } from './tables/user';