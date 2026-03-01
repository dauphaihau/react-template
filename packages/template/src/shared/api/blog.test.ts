import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ResponsePromise } from 'ky'
import { fetchPosts, fetchPostById } from './blog'
import apiClient from '#/shared/lib/api-client'

vi.mock('#/shared/lib/api-client', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('fetchPosts', () => {
  beforeEach(() => {
    vi.mocked(apiClient.get).mockClear()
  })

  it('calls apiClient.get with articles and default page and perPage', async () => {
    const posts: Awaited<ReturnType<typeof fetchPosts>> = []
    vi.mocked(apiClient.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(posts),
    } as unknown as ResponsePromise)
    const result = await fetchPosts()
    expect(apiClient.get).toHaveBeenCalledTimes(1)
    expect(apiClient.get).toHaveBeenCalledWith('articles', {
      searchParams: { page: 1, per_page: 10 },
    })
    expect(result).toBe(posts)
  })

  it('calls apiClient.get with custom page and perPage', async () => {
    const posts: Awaited<ReturnType<typeof fetchPosts>> = []
    vi.mocked(apiClient.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(posts),
    } as unknown as ResponsePromise)
    await fetchPosts(2, 20)
    expect(apiClient.get).toHaveBeenCalledWith('articles', {
      searchParams: { page: 2, per_page: 20 },
    })
  })

  it('returns parsed JSON from response', async () => {
    const posts = [{ id: 1, slug: 'first', title: 'First Post' }]
    vi.mocked(apiClient.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(posts),
    } as unknown as ResponsePromise)
    const result = await fetchPosts(1, 5)
    expect(result).toEqual(posts)
  })
})

describe('fetchPostById', () => {
  beforeEach(() => {
    vi.mocked(apiClient.get).mockClear()
  })

  it('calls apiClient.get with articles/:id', async () => {
    const post = { id: 42, slug: 'my-post', title: 'My Post' }
    vi.mocked(apiClient.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(post),
    } as unknown as ResponsePromise)
    const result = await fetchPostById(42)
    expect(apiClient.get).toHaveBeenCalledTimes(1)
    expect(apiClient.get).toHaveBeenCalledWith('articles/42')
    expect(result).toEqual(post)
  })

  it('returns parsed JSON from response', async () => {
    const post = { id: 1, slug: 'one', title: 'One' }
    vi.mocked(apiClient.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(post),
    } as unknown as ResponsePromise)
    const result = await fetchPostById(1)
    expect(result).toEqual(post)
  })
})
