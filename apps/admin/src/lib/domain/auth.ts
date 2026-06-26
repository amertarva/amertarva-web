export interface AuthAdmin {
	id: string;
	email: string;
	name: string;
}

export interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	admin: AuthAdmin | null;
}
