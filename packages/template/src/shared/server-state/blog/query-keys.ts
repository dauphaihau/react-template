export const blogQueryKeys = {
  all: ['blog'] as const,
  lists: () => [...blogQueryKeys.all, 'list'] as const,
  list: (page: number) => [...blogQueryKeys.lists(), page] as const,
  details: () => [...blogQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...blogQueryKeys.details(), id] as const,
};
