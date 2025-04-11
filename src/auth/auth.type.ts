export interface AccessToken {
  access_token: string;
}

export interface RegisterRequestDto extends LoginRequestDto {
  username: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}
