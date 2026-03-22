import { authAPI } from './api';
import { setToken, setUser, getUser, logout as clearSession } from '../utils/auth';

/**
 * Persists JWT + user (with memberSince) after login/register.
 */
export function persistSession({ token, email, role }) {
  const prev = getUser();
  setToken(token);
  setUser({
    email,
    role,
    memberSince:
      prev?.email === email && prev?.memberSince ? prev.memberSince : new Date().toISOString(),
  });
}

export async function login(credentials) {
  const { data } = await authAPI.login(credentials);
  persistSession(data);
  return data;
}

export async function register(body) {
  const { data } = await authAPI.register(body);
  persistSession(data);
  return data;
}

export function logout() {
  clearSession();
}
