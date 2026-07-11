import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../api';
import type { LoginCredentials } from '../../types';
import { authQueryKeys } from '../query-keys';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginCredentials) => authApi.login(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(authQueryKeys.currentUser(), user);
    },
  });
}
