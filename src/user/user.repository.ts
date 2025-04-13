import { User } from './user.type';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User>;
  abstract create(user: User): Promise<bigint>;
  abstract update(id: number, user: User): Promise<boolean>;
  abstract delete(id: number): Promise<boolean>;
  abstract findByUsername(username: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract updateUserRole(id: number, role: number): Promise<boolean>;
}
