export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}
