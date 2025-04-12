import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserToDtoBatchTransformInterceptor,
  UserToDtoTransformInterceptor,
} from './user.interceptor';
import { User, UserDto } from './user.type';
import { ADMIN, RoleDependent, SELF } from '../auth/auth.constant';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @UseInterceptors(UserToDtoBatchTransformInterceptor)
  @RoleDependent(ADMIN)
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(UserToDtoTransformInterceptor)
  @RoleDependent(SELF)
  getById(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @RoleDependent(SELF)
  update(@Param('id') id: number, @Body() user: UserDto) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @RoleDependent(SELF)
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
