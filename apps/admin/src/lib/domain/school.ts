export type PlanType = 'CLASSIC' | 'PRO' | 'PREMIUM' | 'CUSTOM';
export type SchoolStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'MAINTENANCE';
export type InitStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE' | 'FAILED';
export type CustomDomainStatus = 'NONE' | 'PENDING_DNS' | 'ACTIVE' | 'FAILED';
export type SuspensionReason = 'ADMIN_SUSPENDED' | 'SUBSCRIPTION_EXPIRED' | 'MAINTENANCE' | 'VIOLATION';
export type RentStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'NONE';

export interface RentInfo {
	durationMonths: number | null;
	startDate: string | null;
	endDate: string | null;
	status: RentStatus;
}

export interface SchoolSummary {
	schoolId: string;
	schoolName: string;
	subdomainSlug: string;
	customDomain?: string | null;
	customDomainStatus?: CustomDomainStatus;
	planType: PlanType;
	status: SchoolStatus;
	suspensionReason?: SuspensionReason | null;
	maxStorageGb: number;
	storageAllocation: string[];
	initStatus: InitStatus;
	superAdminEmail?: string | null;
	rent?: RentInfo;
	createdAt: string;
}

export interface CredentialStatus {
	isConfigured: boolean;
}

export interface SchoolDetail {
	schoolId: string;
	schoolName: string;
	subdomainSlug: string;
	customDomain?: string | null;
	customDomainStatus?: CustomDomainStatus;
	customDomainToken?: string | null;
	customDomainVerifiedAt?: string | null;
	planType: PlanType;
	status: SchoolStatus;
	suspensionReason?: SuspensionReason | null;
	suspensionNotice?: string | null;
	maxStorageGb: number;
	storageAllocation: string[];
	serverApiKey?: string | null;
	initStatus: InitStatus;
	initError: string | null;
	superAdminEmail: string | null;
	rent?: RentInfo;
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

