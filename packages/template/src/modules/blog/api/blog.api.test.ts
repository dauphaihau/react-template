import {
  beforeEach, describe, expect, it, vi, 
} from 'vitest';
import { blogApi } from '#/modules/blog';
import type { BlogPostDto } from './dto';

const {
  getJsonMock, postJsonMock, getMock, postMock, 
} = vi.hoisted(() => ({
  getJsonMock: vi.fn(),
  postJsonMock: vi.fn(),
  getMock: vi.fn(),
  postMock: vi.fn(),
}));

vi.mock('#/shared/lib/api-client', () => ({
  default: {
    get: getMock,
    post: postMock,
  },
}));

function createBlogPostFixture(overrides: Partial<BlogPostDto> = {}): BlogPostDto {
  return {
    id: 1,
    slug: 'hello-world',
    title: 'Hello World',
    description: 'Fixture description',
    published_at: '2026-07-11T00:00:00.000Z',
    readable_publish_date: 'Jul 11',
    cover_image: null,
    social_image: 'https://example.com/social-image.png',
    body_html: '<p>Fixture body</p>',
    tag_list: ['fixture'],
    reading_time_minutes: 3,
    url: 'https://example.com/articles/hello-world',
    user: {
      name: 'Fixture User',
      username: 'fixture-user',
      profile_image: 'https://example.com/profile.png',
    },
    ...overrides,
  };
}

describe('blogApi.list', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches article list with default pagination', async () => {
    const posts: Awaited<ReturnType<typeof blogApi.list>> = [];
    getJsonMock.mockResolvedValue(posts);
    getMock.mockReturnValue({ json: getJsonMock });

    const result = await blogApi.list();

    expect(getMock).toHaveBeenCalledWith('articles', {
      searchParams: { page: 1, per_page: 10 },
    });
    expect(result).toBe(posts);
  });

  it('forwards custom pagination params', async () => {
    const posts: Awaited<ReturnType<typeof blogApi.list>> = [];
    getJsonMock.mockResolvedValue(posts);
    getMock.mockReturnValue({ json: getJsonMock });

    await blogApi.list(2, 20);

    expect(getMock).toHaveBeenCalledWith('articles', {
      searchParams: { page: 2, per_page: 20 },
    });
  });

  it('coerces zero page to the default page', async () => {
    const posts: Awaited<ReturnType<typeof blogApi.list>> = [];
    getJsonMock.mockResolvedValue(posts);
    getMock.mockReturnValue({ json: getJsonMock });

    const result = await blogApi.list(1, 5);

    expect(getMock).toHaveBeenCalledWith('articles', {
      searchParams: { page: 1, per_page: 5 },
    });
    expect(result).toBe(posts);
  });
});

describe('blogApi.detail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches article detail by id', async () => {
    const post = createBlogPostFixture({ id: 42 });
    getJsonMock.mockResolvedValue(post);
    getMock.mockReturnValue({ json: getJsonMock });

    const result = await blogApi.detail(42);

    expect(getMock).toHaveBeenCalledWith('articles/42');
    expect(result).toBe(post);
  });

  it('supports id value 1 without fallback coercion', async () => {
    const post = createBlogPostFixture({ id: 1 });
    getJsonMock.mockResolvedValue(post);
    getMock.mockReturnValue({ json: getJsonMock });

    const result = await blogApi.detail(1);

    expect(getMock).toHaveBeenCalledWith('articles/1');
    expect(result).toBe(post);
  });
});

describe('blogApi.create', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('posts article payload and returns created article', async () => {
    const payload = {
      title: 'Hello',
      description: 'World',
      body_markdown: '## Post',
      tags: ['test'],
    };
    const created = createBlogPostFixture({
      id: 7,
      title: payload.title,
      description: payload.description,
      tag_list: payload.tags ?? [],
    });
    postJsonMock.mockResolvedValue(created);
    postMock.mockReturnValue({ json: postJsonMock });

    const result = await blogApi.create(payload);

    expect(postMock).toHaveBeenCalledWith('articles', { json: payload });
    expect(result).toBe(created);
  });
});
