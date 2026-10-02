import { schoolsStore } from '../stores/schools.store';
import {
	listSchoolsApi,
	getSchoolApi,
	createSchoolApi,
	updateSchoolApi,
	deleteSchoolApi,
	updateSchoolStatusApi,
	setCustomDomainApi,
	verifyCustomDomainApi,
	removeCustomDomainApi,
	extendRentApi,
	initializeSchoolApi,
	getSchoolApiKeyApi
} from '../../infrastructure/api/schools.api';

// Muat daftar sekolah
export async function loadSchools() {
	const { data } = await listSchoolsApi();
	schoolsStore.set(data);
}

// Detail sekolah
export function getSchool(id: string) {
	return getSchoolApi(id);
}

// Buat sekolah
export async function createSchool(payload: Record<string, unknown>) {
	const school = await createSchoolApi(payload);
	await loadSchools();
	return school;
}

// Update sekolah
export async function updateSchool(id: string, payload: Record<string, unknown>) {
	const school = await updateSchoolApi(id, payload);
	await loadSchools();
	return school;
}

// Nonaktifkan sekolah
export async function deleteSchool(id: string) {
	await deleteSchoolApi(id);
	await loadSchools();
}

// Update status On/Off / Suspend
export async function changeSchoolStatus(
	id: string,
	data: { status: string; suspensionReason?: string; suspensionNotice?: string } | string,
	suspensionReason?: string,
	suspensionNotice?: string
) {
	const payload =
		typeof data === 'object'
			? data
			: { status: data, suspensionReason, suspensionNotice };
	const school = await updateSchoolStatusApi(id, payload);
	await loadSchools();
	return school;
}

// Set Custom Domain
export async function configureCustomDomain(id: string, domain: string) {
	const school = await setCustomDomainApi(id, domain);
	await loadSchools();
	return school;
}

// Cek / Verifikasi DNS Custom Domain
export async function checkCustomDomainDNS(id: string) {
	const result = await verifyCustomDomainApi(id);
	await loadSchools();
	return result;
}

// Hapus Custom Domain
export async function deleteCustomDomain(id: string) {
	const result = await removeCustomDomainApi(id);
	await loadSchools();
	return result;
}

// Perpanjang Masa Sewa
export async function addSchoolRentMonths(id: string, months: number) {
	const school = await extendRentApi(id, months);
	await loadSchools();
	return school;
}

// Inisialisasi Database Tenant & Akun Super Admin
export async function initializeSchool(
	id: string,
	body: { superAdminEmail?: string; superAdminPassword?: string; generatePassword?: boolean }
) {
	const result = await initializeSchoolApi(id, body);
	await loadSchools();
	return result;
}

// Ambil Server API Key per-sekolah
export async function getSchoolApiKey(id: string) {
	return getSchoolApiKeyApi(id);
}
