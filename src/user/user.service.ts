import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserDto } from './user.type';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async create(userDto: UserDto): Promise<bigint> {
    const date = new Date();
    const user: User = {
      ...userDto,
      create_date: date,
      update_date: date,
      version: 1,
      id: BigInt(0),
    };
    return this.userRepository.create(user);
  }

  async update(id: number, userDto: UserDto): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new BadRequestException('User not found');

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
    if (!user) throw new BadRequestException('User not found');
    await this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsername(username);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
}
