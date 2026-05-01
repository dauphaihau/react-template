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

export interface CreateBlogPostDto {
  title: string
  description: string
  body_markdown: string
  tags?: string[]
}
