import { useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '#/shared/api/blog';
import type { CreateBlogPostDto } from '#/shared/api/blog';
import { blogQueryKeys } from './query-keys';

export function useCreateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBlogPostDto) => blogApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
    },
  });
}
