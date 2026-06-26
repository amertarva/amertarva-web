export type PlanType = 'CLASSIC' | 'PREMIUM' | 'CUSTOM';
export type SchoolStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED';
export type InitStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE' | 'FAILED';

export interface SchoolSummary {
	schoolId: string;
	schoolName: string;
	subdomainSlug: string;
	planType: PlanType;
	status: SchoolStatus;
	maxStorageGb: number;
	storageAllocation: string[];
	initStatus: InitStatus;
	createdAt: string;
}

export interface CredentialStatus {
	isConfigured: boolean;
}

export interface SchoolDetail {
	schoolId: string;
	schoolName: string;
	subdomainSlug: string;
	planType: PlanType;
	status: SchoolStatus;
	maxStorageGb: number;
	storageAllocation: string[];
	initStatus: InitStatus;
	initError: string | null;
	superAdminEmail: string | null;
	createdAt: string;
	updatedAt: string;
	credentials: {
		supaTeachers: CredentialStatus;
		supaStudents: CredentialStatus;
		supaClasses: CredentialStatus;
		supaGrades: CredentialStatus;
		astradb: CredentialStatus;
		mongodb: CredentialStatus;
		turso: CredentialStatus;
		nas: CredentialStatus;
	};
}
