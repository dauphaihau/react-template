import apiClient from '#/shared/lib/api-client';
import type { BlogPostDto, CreateBlogPostDto } from './dto';

export const blogApi = {
  list(page = 1, perPage = 10): Promise<BlogPostDto[]> {
    return apiClient
      .get('articles', { searchParams: { page, per_page: perPage } })
      .json<BlogPostDto[]>();
  },

  detail(id: number): Promise<BlogPostDto> {
    return apiClient.get(`articles/${id}`).json<BlogPostDto>();
  },

  create(payload: CreateBlogPostDto): Promise<BlogPostDto> {
    return apiClient.post('articles', { json: payload }).json<BlogPostDto>();
  },
};
