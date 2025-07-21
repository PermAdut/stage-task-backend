export interface UserResponseDto {
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponseDto {
  accessToken: string;
}

export interface RegisterResponseDto {
  username: string;
  firstName: string;
  lastName: string;
  age: number;
}