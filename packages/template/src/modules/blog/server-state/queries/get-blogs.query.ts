import { queryOptions, useQuery } from '@tanstack/react-query';
import { blogApi } from '../../api';
import { blogQueryKeys } from '../query-keys';

export function getBlogsQueryOptions(page = 1) {
  return queryOptions({
    queryKey: blogQueryKeys.list(page),
    queryFn: () => blogApi.list(page),
  });
}

export function useGetBlogsQuery(page = 1) {
  return useQuery(getBlogsQueryOptions(page));
}
