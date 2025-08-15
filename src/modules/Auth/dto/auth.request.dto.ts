import { IUser } from "../user";

export interface UserRequestDto extends Pick<IUser, 'username'> {
  password: string;
}

export interface RegisterRequestDto extends Omit<IUser, 'id' | 'passwordHash'> {
  password: string;
  repeatPassword: string;
}
