export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  username: string;
  userId: string;
  token: string;
}
