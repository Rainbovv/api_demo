import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User, UserDto } from '../user/user.type';
import { AccessToken, LoginRequestDto, RegisterRequestDto } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginRequestDto: LoginRequestDto): Promise<User> {
    const user = await this.usersService.findByEmail(loginRequestDto.email);
    if (!user) throw new BadRequestException('User not found');

    if (!bcrypt.compareSync(loginRequestDto.password, user.password))
      throw new BadRequestException('Password does not match');

    return user;
  }

  login(user: UserDto): AccessToken {
    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    let existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser)
      throw new BadRequestException('User with such email already exists');

    existingUser = await this.usersService.findByUsername(user.email);
    if (existingUser)
      throw new BadRequestException('User with such username already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: UserDto = {
      ...user,
      password: hashedPassword,
      role: 1,
    };
    newUser.id = await this.usersService.create(newUser);
    return this.login(newUser);
  }
}
