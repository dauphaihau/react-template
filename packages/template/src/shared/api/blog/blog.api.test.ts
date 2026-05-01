import {
  beforeEach, describe, expect, it, vi
} from 'vitest';
import type { ResponsePromise } from 'ky';
import { blogApi } from './blog.api';
import apiClient from '#/shared/lib/api-client';

vi.mock('#/shared/lib/api-client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('blogApi.list', () => {
  beforeEach(() => {
    vi.mocked(apiClient.get).mockClear();
  });

  it('calls apiClient.get with articles and default page and perPage', async () => {
    const posts: Awaited<ReturnType<typeof blogApi.list>> = [];
    vi.mocked(apiClient.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(posts),
    } as unknown as ResponsePromise);
    const result = await blogApi.list();
    expect(apiClient.get).toHaveBeenCalledTimes(1);
    expect(apiClient.get).toHaveBeenCalledWith('articles', {
      searchParams: { page: 1, per_page: 10 },
    });
    expect(result).toBe(posts);
  });

  it('calls apiClient.get with custom page and perPage', async () => {
    const posts: Awaited<ReturnType<typeof blogApi.list>> = [];
    vi.mocked(apiClient.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(posts),
    } as unknown as ResponsePromise);
    await blogApi.list(2, 20);
    expect(apiClient.get).toHaveBeenCalledWith('articles', {
      searchParams: { page: 2, per_page: 20 },
    });
  });

  it('returns parsed JSON from response', async () => {
    const posts = [{ id: 1, slug: 'first', title: 'First Post' }];
    vi.mocked(apiClient.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(posts),
    } as unknown as ResponsePromise);
    const result = await blogApi.list(1, 5);
    expect(result).toEqual(posts);
  });
});

describe('blogApi.detail', () => {
  beforeEach(() => {
    vi.mocked(apiClient.get).mockClear();
  });

  it('calls apiClient.get with articles/:id', async () => {
    const post = { id: 42, slug: 'my-post', title: 'My Post' };
    vi.mocked(apiClient.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(post),
    } as unknown as ResponsePromise);
    const result = await blogApi.detail(42);
    expect(apiClient.get).toHaveBeenCalledTimes(1);
    expect(apiClient.get).toHaveBeenCalledWith('articles/42');
    expect(result).toEqual(post);
  });

  it('returns parsed JSON from response', async () => {
    const post = { id: 1, slug: 'one', title: 'One' };
    vi.mocked(apiClient.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(post),
    } as unknown as ResponsePromise);
    const result = await blogApi.detail(1);
    expect(result).toEqual(post);
  });
});

describe('blogApi.create', () => {
  beforeEach(() => {
    vi.mocked(apiClient.post).mockClear();
  });

  it('calls apiClient.post with articles and payload JSON', async () => {
    const payload = {
      title: 'New Post',
      description: 'A new post',
      body_markdown: '# New Post',
      tags: ['react'],
    };
    const post = { id: 100, slug: 'new-post', title: 'New Post' };
    vi.mocked(apiClient.post).mockReturnValue({
      json: vi.fn().mockResolvedValue(post),
    } as unknown as ResponsePromise);
    const result = await blogApi.create(payload);
    expect(apiClient.post).toHaveBeenCalledTimes(1);
    expect(apiClient.post).toHaveBeenCalledWith('articles', { json: payload });
    expect(result).toEqual(post);
  });
});
