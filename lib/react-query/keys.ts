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

  // tag
  tag: {
    all: ['tags'] as const,
    lists: () => [...queryKeys.tag.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.tag.lists(), params] as const,
    details: () => [...queryKeys.tag.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tag.details(), id] as const,
  },

  // category
  category: {
    all: ['categories'] as const,
    groups: () => [...queryKeys.category.all, 'groups'] as const,
    lists: () => [...queryKeys.category.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.category.lists(), params] as const,
    details: () => [...queryKeys.category.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.category.details(), id] as const,
  },

  // page
  page: {
    all: ['pages'] as const,
    lists: () => [...queryKeys.page.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.page.lists(), params] as const,
    details: () => [...queryKeys.page.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.page.details(), id] as const,
  },

  // testimonial
  testimonial: {
    all: ['testimonials'] as const,
    lists: () => [...queryKeys.testimonial.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.testimonial.lists(), params] as const,
    details: () => [...queryKeys.testimonial.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.testimonial.details(), id] as const,
  },

  // faq
  faq: {
    all: ['faqs'] as const,
    lists: () => [...queryKeys.faq.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.faq.lists(), params] as const,
    details: () => [...queryKeys.faq.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.faq.details(), id] as const,
  },

   // media
  media: {
    all: ['medias'] as const,
    lists: () => [...queryKeys.media.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.media.lists(), params] as const,
    details: () => [...queryKeys.media.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.media.details(), id] as const,
  },

  // ad
  ad: {
    all: ['ads'] as const,
    lists: () => [...queryKeys.ad.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.ad.lists(), params] as const,
    details: () => [...queryKeys.ad.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.ad.details(), id] as const,
  },
  // Dashboard
  dashboard: {
    all: ['dashboard'] as const,
    stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
    charts: (period: string) =>
      [...queryKeys.dashboard.all, 'charts', period] as const,
  },
} as const;
