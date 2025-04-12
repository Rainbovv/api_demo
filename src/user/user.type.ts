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

export class UserNotFoundException extends Error {
  constructor(id: number) {
    super('User with id {' + id + '} has not been found');
  }
}
