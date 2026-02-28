import { useQuery } from '@tanstack/react-query'
import { blogQueries } from '#/shared/queries/blog'

export function useBlogPost(id: number) {
  return useQuery(blogQueries.detail(id))
}
