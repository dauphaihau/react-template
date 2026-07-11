import { queryOptions, useQuery } from '@tanstack/react-query';
import { authApi } from '../../api';
import { authQueryKeys } from '../query-keys';

export function getCurrentUserQueryOptions() {
  return queryOptions({
    queryKey: authQueryKeys.currentUser(),
    queryFn: () => authApi.currentUser(),
  });
}

export function useCurrentUserQuery() {
  return useQuery(getCurrentUserQueryOptions());
}
