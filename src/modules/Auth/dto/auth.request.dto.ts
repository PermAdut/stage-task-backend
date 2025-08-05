export interface UserRequestDto {
  username: string;
  password: string;
}

export interface RegisterRequestDto {
  username: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  age: number;
}
