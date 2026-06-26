// Single source of truth untuk form create/edit — 8 grup, 18 field total
export const CREDENTIAL_GROUPS = [
	{
		allocationType: 'Supabase',
		title: 'Supabase — Teachers',
		fields: [
			{ key: 'supaTeachersUrl', label: 'URL' },
			{ key: 'supaTeachersKey', label: 'Service Role Key' }
		]
	},
	{
		allocationType: 'Supabase',
		title: 'Supabase — Students',
		fields: [
			{ key: 'supaStudentsUrl', label: 'URL' },
			{ key: 'supaStudentsKey', label: 'Service Role Key' }
		]
	},
	{
		allocationType: 'Supabase',
		title: 'Supabase — Classes',
		fields: [
			{ key: 'supaClassesUrl', label: 'URL' },
			{ key: 'supaClassesKey', label: 'Service Role Key' }
		]
	},
	{
		allocationType: 'Supabase',
		title: 'Supabase — Grades',
		fields: [
			{ key: 'supaGradesUrl', label: 'URL' },
			{ key: 'supaGradesKey', label: 'Service Role Key' }
		]
	},
	{
		allocationType: 'AstraDB',
		title: 'AstraDB',
		fields: [
			{ key: 'astradbEndpoint', label: 'Endpoint' },
			{ key: 'astradbToken', label: 'Token' },
			{ key: 'astradbNamespace', label: 'Namespace' }
		]
	},
	{
		allocationType: 'MongoDB',
		title: 'MongoDB',
		fields: [
			{ key: 'mongodbUri', label: 'URI' },
			{ key: 'mongodbDbName', label: 'Database Name' }
		]
	},
	{
		allocationType: 'Turso',
		title: 'Turso (Bank Soal)',
		fields: [
			{ key: 'tursoUrl', label: 'URL' },
			{ key: 'tursoAuthToken', label: 'Auth Token' }
		]
	},
	{
		allocationType: 'NAS',
		title: 'NAS Storage',
		fields: [
			{ key: 'nasUrl', label: 'URL' },
			{ key: 'nasUsername', label: 'Username' },
			{ key: 'nasPassword', label: 'Password' }
		]
	}
] as const;

// Inisialisasi object kosong untuk form
export function emptyCredentials(): Record<string, string> {
	const result: Record<string, string> = {};
	for (const group of CREDENTIAL_GROUPS) {
		for (const field of group.fields) result[field.key] = '';
	}
	return result;
}
