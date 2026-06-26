import { apiFetch } from './client';
import type { SchoolDetail, SchoolSummary } from '../../domain/school';

// List sekolah
export function listSchoolsApi(): Promise<{ data: SchoolSummary[] }> {
	return apiFetch('/schools');
}

// Detail sekolah
export function getSchoolApi(id: string): Promise<SchoolDetail> {
	return apiFetch(`/schools/${id}`);
}

// Buat sekolah
export function createSchoolApi(body: any): Promise<SchoolDetail> {
	return apiFetch('/schools', { method: 'POST', body: JSON.stringify(body) });
}

// Update sekolah
export function updateSchoolApi(id: string, body: any): Promise<SchoolDetail> {
	return apiFetch(`/schools/${id}`, { method: 'PUT', body: JSON.stringify(body) });
}

// Nonaktifkan sekolah
export function deleteSchoolApi(id: string): Promise<{ success: boolean }> {
	return apiFetch(`/schools/${id}`, { method: 'DELETE' });
}
