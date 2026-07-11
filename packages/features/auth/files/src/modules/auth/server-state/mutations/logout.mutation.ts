import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../api';
import { authQueryKeys } from '../query-keys';

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.setQueryData(authQueryKeys.currentUser(), null);
    },
  });
}
