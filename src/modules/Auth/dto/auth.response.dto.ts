import { IUser } from "../user";

export interface UserResponseDto extends Pick<IUser, 'username'> {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponseDto {
  accessToken: string;
}

export interface RegisterResponseDto extends Omit<IUser, 'id' | 'passwordHash'>{
  accessToken: string;
  refreshToken: string;
}