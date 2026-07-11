import type {
  LoginCredentials,
  RegisterCredentials,
  User,
} from '../types';

const STORAGE_KEY = 'react-template.current-user';
const USERS_STORAGE_KEY = 'react-template.mock-users';

// Mock auth API. Replace these functions with real HTTP calls in production.
export const authApi = {
  async currentUser(): Promise<User | null> {
    await delay(150);
    return readStoredUser();
  },

  async login({ email, password }: LoginCredentials): Promise<User> {
    await delay(400);
    const mockUsers = readStoredUsers();
    const record = mockUsers.get(email);

    if (!record || record.password !== password) {
      throw new Error('Invalid email or password');
    }

    writeStoredUser(record.user);
    return record.user;
  },

  async register({
    email,
    password,
    name,
  }: RegisterCredentials): Promise<User> {
    await delay(400);
    const mockUsers = readStoredUsers();

    if (mockUsers.has(email)) {
      throw new Error('Email already registered');
    }

    const user: User = { id: crypto.randomUUID(), email, name };
    mockUsers.set(email, { password, user });
    writeStoredUsers(mockUsers);
    writeStoredUser(user);
    return user;
  },

  async logout(): Promise<void> {
    await delay(150);
    clearStoredUser();
  },
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readStoredUser(): User | null {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function writeStoredUser(user: User): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function clearStoredUser(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

function readStoredUsers(): Map<string, { password: string; user: User }> {
  if (typeof window === 'undefined') return new Map();

  const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) return new Map();

  try {
    const parsed = JSON.parse(raw) as Array<
      [string, { password: string; user: User }]
    >;
    return new Map(parsed);
  } catch {
    window.localStorage.removeItem(USERS_STORAGE_KEY);
    return new Map();
  }
}

function writeStoredUsers(
  users: Map<string, { password: string; user: User }>
): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify(Array.from(users.entries()))
  );
}
