import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User, UserDto, UserNotFoundException } from './user.type';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (user == undefined) throw new UserNotFoundException(id);
    return user;
  }

  async create(userDto: UserDto): Promise<void> {
    const date = new Date();
    const user: User = {
      id: userDto.id,
      username: userDto.username,
      email: userDto.email,
      password: userDto.password,
      role: userDto.role,
      create_date: date,
      update_date: date,
      version: 1,
    };
    await this.userRepository.create(user);
  }

  async update(id: number, userDto: UserDto): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (user == undefined) throw new UserNotFoundException(id);

    user.version = ++user.version;
    user.update_date = new Date();
    user.username = userDto.username;
    user.email = userDto.email;
    user.password = userDto.password;
    user.role = userDto.role;

    await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (user == undefined) throw new UserNotFoundException(id);
    await this.userRepository.delete(id);
  }
}
