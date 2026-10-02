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

// Get Current Admin
export function getMeApi() {
	return apiFetch('/auth/me', {
		method: 'GET'
	});
}

// Update Profile (Name & Email)
export function updateProfileApi(data: { name?: string; email?: string }) {
	return apiFetch('/auth/profile', {
		method: 'PATCH',
		body: JSON.stringify(data)
	});
}

// Update Password
export function updatePasswordApi(data: { currentPassword: string; newPassword: string }) {
	return apiFetch('/auth/password', {
		method: 'PATCH',
		body: JSON.stringify(data)
	});
}
