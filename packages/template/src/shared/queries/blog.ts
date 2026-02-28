import { queryOptions } from '@tanstack/react-query'
import { fetchPostById, fetchPosts } from '#/shared/api/blog'

export const blogQueries = {
  list: (page = 1) =>
    queryOptions({
      queryKey: ['blog', 'list', page],
      queryFn: () => fetchPosts(page),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: ['blog', 'detail', id],
      queryFn: () => fetchPostById(id),
    }),
}
