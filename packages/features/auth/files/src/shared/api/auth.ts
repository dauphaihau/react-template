import type { User, LoginCredentials, RegisterCredentials } from '#/features/auth/types'

// Mock auth API — replace with real HTTP calls in production
const mockUsers = new Map<string, { password: string; user: User }>()

export const authApi = {
  async login({ email, password }: LoginCredentials): Promise<User> {
    await delay(400)
    const record = mockUsers.get(email)
    if (!record || record.password !== password) {
      throw new Error('Invalid email or password')
    }
    return record.user
  },

  async register({ email, password, name }: RegisterCredentials): Promise<User> {
    await delay(400)
    if (mockUsers.has(email)) {
      throw new Error('Email already registered')
    }
    const user: User = { id: crypto.randomUUID(), email, name }
    mockUsers.set(email, { password, user })
    return user
  },

  logout(): void {
    // Clear session state here (localStorage token, cookie, etc.)
  },
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
