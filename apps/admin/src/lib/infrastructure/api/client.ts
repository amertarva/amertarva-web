import { PUBLIC_API_URL } from '$env/static/public';
import { get } from 'svelte/store';
import { authStore } from '../../application/stores/auth.store';

// Fetch wrapper + auth header
export async function apiFetch(path: string, options: RequestInit = {}) {
	const token = get(authStore).accessToken;
	const res = await fetch(`${PUBLIC_API_URL}${path}`, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...options.headers
		}
	});
	if (!res.ok) {
		const err = await res.json().catch(() => ({ error: 'Unknown error' }));
		throw new Error(err.error ?? 'Request failed');
	}
	return res.json();
}
