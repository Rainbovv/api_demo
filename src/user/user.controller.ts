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
import { ZodPipe } from '../zod/zod.pipe';
import { UserSchema } from '../zod/zod.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(UserToDtoBatchTransformInterceptor)
  @RoleDependent(ADMIN)
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseInterceptors(UserToDtoTransformInterceptor)
  @RoleDependent(SELF)
  getById(@Param('id') id: number): Promise<UserDto> {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @RoleDependent(SELF)
  update(
    @Param('id') id: number,
    @Body(new ZodPipe(UserSchema)) user: UserDto,
  ) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @RoleDependent(SELF)
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Patch('/elevate/:id')
  @RoleDependent(ADMIN)
  elevateUser(@Param('id') id: number) {
    return this.userService.elevateUser(id);
  }
}
