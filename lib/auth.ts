// Client-side auth utility using localStorage
// Works on any deployment platform (no server/DB needed)

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  plan: string;
  createdAt: string;
}

export interface Session {
  userId: string;
  username: string;
  email: string;
  plan: string;
}

const USERS_KEY = "nexus_users";
const SESSION_KEY = "nexus_session";

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveUser(user: User): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): User | null {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function findUserByUsername(username: string): User | null {
  return getUsers().find((u) => u.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
