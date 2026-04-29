import { useQuery } from '@tanstack/react-query';
import { blogQueries } from '#/shared/queries/blog';

export function useBlogPosts(page = 1) {
  return useQuery(blogQueries.list(page));
}
