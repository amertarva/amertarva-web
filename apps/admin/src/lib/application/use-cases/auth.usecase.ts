import { authStore } from '../stores/auth.store';
import { loginApi } from '../../infrastructure/api/auth.api';

// Login
export async function login(email: string, password: string) {
	const result = await loginApi(email, password);
	authStore.set({
		accessToken: result.accessToken,
		refreshToken: result.refreshToken,
		admin: result.admin
	});
}

// Logout
export function logout() {
	authStore.set({ accessToken: null, refreshToken: null, admin: null });
}
