import axios from 'axios';
import type { AuthResponse, SignupRequest, SigninRequest } from '../types';

const BASE = '/api/auth';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

export async function signup(data: SignupRequest): Promise<void> {
  await axios.post(`${BASE}/signup`, data, { headers: JSON_HEADERS });
}

export async function signin(data: SigninRequest): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>(`${BASE}/signin`, data, { headers: JSON_HEADERS });
  return res.data;
}

export async function refresh(refreshToken: string): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>(`${BASE}/refresh`, { refreshToken }, { headers: JSON_HEADERS });
  return res.data;
}
