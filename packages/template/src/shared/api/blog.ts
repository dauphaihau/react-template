import apiClient from '#/shared/lib/api-client';

export interface BlogPostDto {
  id: number
  slug: string
  title: string
  description: string
  published_at: string
  readable_publish_date: string
  cover_image: string | null
  social_image: string
  body_html: string
  tag_list: string[]
  reading_time_minutes: number
  url: string
  user: {
    name: string
    username: string
    profile_image: string
  }
}

export function fetchPosts(page = 1, perPage = 10): Promise<BlogPostDto[]> {
  return apiClient
    .get('articles', { searchParams: { page, per_page: perPage } })
    .json<BlogPostDto[]>();
}

export function fetchPostById(id: number): Promise<BlogPostDto> {
  return apiClient.get(`articles/${id}`).json<BlogPostDto>();
}
