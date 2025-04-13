export interface User {
  id?: bigint;
  username: string;
  email: string;
  role: number;
  password: string;
  create_date: Date;
  update_date: Date;
  version: number;
}

export interface UserDto {
  id?: bigint;
  username: string;
  email: string;
  role: number;
  password: string;
}

export enum Role {
  User = 1,
  Admin = 2,
}
