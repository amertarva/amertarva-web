import { authStore } from '../stores/auth.store';
import {
	loginApi,
	getMeApi,
	updateProfileApi,
	updatePasswordApi
} from '../../infrastructure/api/auth.api';

export const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000; // 1 Jam (3.600.000 ms)
export const LAST_ACTIVITY_KEY = 'amertarva_last_activity';

let lastWriteTime = 0;

// Catat waktu aktivitas terakhir user (Throttled per 10 detik)
export function recordUserActivity() {
	if (typeof localStorage === 'undefined') return;
	const now = Date.now();
	if (now - lastWriteTime > 10_000) {
		lastWriteTime = now;
		localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
	}
}

// Cek apakah user telah tidak aktif selama > 1 jam
export function checkSessionInactivity(): boolean {
	if (typeof localStorage === 'undefined') return false;
	const raw = localStorage.getItem(LAST_ACTIVITY_KEY);
	if (!raw) return false;
	const lastActivity = Number(raw);
	if (isNaN(lastActivity)) return false;

	const now = Date.now();
	if (now - lastActivity > INACTIVITY_TIMEOUT_MS) {
		logout();
		localStorage.removeItem(LAST_ACTIVITY_KEY);
		return true; // Expired
	}
	return false;
}

// Login
export async function login(email: string, password: string) {
	const result = await loginApi(email, password);
	authStore.set({
		accessToken: result.accessToken,
		refreshToken: result.refreshToken,
		admin: result.admin
	});
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
		lastWriteTime = Date.now();
	}
}

// Logout
export function logout() {
	authStore.set({ accessToken: null, refreshToken: null, admin: null });
	if (typeof localStorage !== 'undefined') {
		localStorage.removeItem(LAST_ACTIVITY_KEY);
	}
}

// Load Current Admin
export async function loadCurrentAdmin() {
	try {
		const admin = await getMeApi();
		authStore.update((state) => ({
			...state,
			admin: {
				id: admin.id,
				name: admin.name,
				email: admin.email
			}
		}));
		return admin;
	} catch (e) {
		console.error('Failed to load current admin:', e);
		return null;
	}
}

// Update Admin Profile (Nama & Email)
export async function updateAdminProfile(name: string, email: string) {
	const updated = await updateProfileApi({ name, email });
	authStore.update((state) => ({
		...state,
		admin: {
			...(state.admin || { id: updated.id }),
			name: updated.name,
			email: updated.email
		}
	}));
	return updated;
}

// Update Admin Password
export async function updateAdminPassword(currentPassword: string, newPassword: string) {
	return await updatePasswordApi({ currentPassword, newPassword });
}
