import { apiFetch } from './client';

// Login
export function loginApi(email: string, password: string) {
	return apiFetch('/auth/login', {
		method: 'POST',
		body: JSON.stringify({ email, password })
	});
}

// Refresh
export function refreshApi(refreshToken: string) {
	return apiFetch('/auth/refresh', {
		method: 'POST',
		body: JSON.stringify({ refreshToken })
	});
}
