import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../api';
import type { RegisterCredentials } from '../../types';
import { authQueryKeys } from '../query-keys';

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterCredentials) => authApi.register(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(authQueryKeys.currentUser(), user);
    },
  });
}
