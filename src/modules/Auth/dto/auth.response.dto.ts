export interface UserResponseDto {
  userName: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponseDto {
  accessToken: string;
}
