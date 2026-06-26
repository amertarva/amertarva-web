import { schoolsStore } from '../stores/schools.store';
import {
	listSchoolsApi,
	getSchoolApi,
	createSchoolApi,
	updateSchoolApi,
	deleteSchoolApi
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
