import { PUBLIC_API_URL } from '$env/static/public';
import { get } from 'svelte/store';
import { authStore } from '../../application/stores/auth.store';
import { sanitizeObject } from '../security/sanitizer';

// Fetch wrapper + auth header + automatic payload sanitization
export async function apiFetch(path: string, options: RequestInit = {}) {
	const token = get(authStore).accessToken;
	let sanitizedBody = options.body;

	if (typeof options.body === 'string' && options.body.startsWith('{')) {
		try {
			const parsed = JSON.parse(options.body);
			const clean = sanitizeObject(parsed);
			sanitizedBody = JSON.stringify(clean);
		} catch {
			// fallback
		}
	}

	const res = await fetch(`${PUBLIC_API_URL}${path}`, {
		...options,
		body: sanitizedBody,
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
