// =============================================================================
// QUERY KEYS FACTORY
// =============================================================================
// Centralizes all query keys for consistent cache invalidation and devtools.
// Pattern: [scope, entity, ...params]

export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.users.lists(), params] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },

  // reportReason
  reportReason: {
    all: ['reportReason'] as const,
    active: () => [...queryKeys.reportReason.all, 'active'] as const,
    lists: () => [...queryKeys.reportReason.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.reportReason.lists(), params] as const,
    details: () => [...queryKeys.reportReason.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.reportReason.details(), id] as const,
  },

  // report
  report: {
    all: ['reports'] as const,
    lists: () => [...queryKeys.report.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.report.lists(), params] as const,
    details: () => [...queryKeys.report.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.report.details(), id] as const,
  },

  // developer
  developer: {
    all: ['developers'] as const,
    lists: () => [...queryKeys.developer.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.developer.lists(), params] as const,
    details: () => [...queryKeys.developer.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.developer.details(), id] as const,
  },

  // Dashboard
  dashboard: {
    all: ['dashboard'] as const,
    stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
    charts: (period: string) =>
      [...queryKeys.dashboard.all, 'charts', period] as const,
  },
} as const;
