import { writable } from 'svelte/store';
import type { AuthState } from '../../domain/auth';

const STORAGE_KEY = 'amertarva_auth';

// Load auth state
function load(): AuthState {
	if (typeof localStorage === 'undefined')
		return { accessToken: null, refreshToken: null, admin: null };
	const raw = localStorage.getItem(STORAGE_KEY);
	return raw ? JSON.parse(raw) : { accessToken: null, refreshToken: null, admin: null };
}

// Store Auth
export const authStore = writable<AuthState>(load());

authStore.subscribe((state) => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}
});
