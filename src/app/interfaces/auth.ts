export interface SigninI {
	username: string;
	password: string;
}

export interface SignupI {
	username: string;
	email: string;
	password: string;
	confirm_password: string;
}

export interface JwtI {
	id: string;
	email: string;
	username: string;
	exp?: string;
}