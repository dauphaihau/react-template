import { queryOptions, useQuery } from '@tanstack/react-query';
import { blogApi } from '#/shared/api/blog';
import { blogQueryKeys } from './query-keys';

export function getBlogQueryOptions(id: number) {
  return queryOptions({
    queryKey: blogQueryKeys.detail(id),
    queryFn: () => blogApi.detail(id),
  });
}

export function useGetBlogQuery(id: number) {
  return useQuery(getBlogQueryOptions(id));
}
