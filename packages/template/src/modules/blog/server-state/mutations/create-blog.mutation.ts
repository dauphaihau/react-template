import { useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '../../api';
import type { CreateBlogPostDto } from '../../api';
import { blogQueryKeys } from '../query-keys';

export function useCreateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBlogPostDto) => blogApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
    },
  });
}
