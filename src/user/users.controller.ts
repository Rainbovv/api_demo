import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserToDtoBatchTransformInterceptor,
  UserToDtoTransformInterceptor,
} from './users.interceptor';
import { User, UserDto } from './users.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(UserToDtoBatchTransformInterceptor)
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseInterceptors(UserToDtoTransformInterceptor)
  getById(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.getById(id);
  }

  // @Post()
  // create(@Body() user: UserDto) {
  //   return this.usersService.create(user);
  // }

  @Patch(':id')
  update(@Param('id') id: number, @Body() user: UserDto) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
