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

// Update Status Sekolah (On/Off / Suspend / Maintenance)
export function updateSchoolStatusApi(
	id: string,
	body: { status: string; suspensionReason?: string; suspensionNotice?: string }
): Promise<SchoolDetail> {
	return apiFetch(`/schools/${id}/status`, {
		method: 'PATCH',
		body: JSON.stringify(body)
	});
}

// Set Custom Domain
export function setCustomDomainApi(id: string, customDomain: string): Promise<SchoolDetail> {
	return apiFetch(`/schools/${id}/custom-domain`, {
		method: 'POST',
		body: JSON.stringify({ customDomain })
	});
}

// Verifikasi DNS Custom Domain
export function verifyCustomDomainApi(id: string): Promise<{
	success: boolean;
	verified: boolean;
	method?: string;
	message?: string;
	diagnostics?: string[];
	school: SchoolDetail;
}> {
	return apiFetch(`/schools/${id}/verify-domain`, {
		method: 'POST'
	});
}

// Hapus Custom Domain
export function removeCustomDomainApi(id: string): Promise<SchoolDetail> {
	return apiFetch(`/schools/${id}/custom-domain`, {
		method: 'DELETE'
	});
}

// Perpanjang Masa Sewa
export function extendRentApi(id: string, extendMonths: number): Promise<SchoolDetail> {
	return apiFetch(`/schools/${id}/extend-rent`, {
		method: 'POST',
		body: JSON.stringify({ extendMonths })
	});
}

export interface InitializeSchoolResult {
	success: boolean;
	school: SchoolDetail;
	superAdmin: {
		email: string;
		password?: string;
		userId?: string | null;
		message?: string;
	};
}

// Inisialisasi Database Tenant & Akun Super Admin
export function initializeSchoolApi(
	id: string,
	body: { superAdminEmail?: string; superAdminPassword?: string; generatePassword?: boolean }
): Promise<InitializeSchoolResult> {
	return apiFetch(`/schools/${id}/initialize`, {
		method: 'POST',
		body: JSON.stringify(body)
	});
}

// Ambil Server API Key per-sekolah (untuk disalin ke .env Server Go)
export function getSchoolApiKeyApi(id: string): Promise<{
	schoolId: string;
	schoolName: string;
	serverApiKey: string;
	hint: string;
}> {
	return apiFetch(`/schools/${id}/api-key`);
}
