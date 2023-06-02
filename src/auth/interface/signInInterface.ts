export interface SignInResponse {
  message: string;
  user: {
    id: string;
    fullname: string;
    username: string;
    email: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
