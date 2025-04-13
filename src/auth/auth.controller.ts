import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessToken, LoginRequestDto, RegisterRequestDto } from './auth.type';
import { Public } from './auth.constant';
import { ZodPipe } from '../zod/zod.pipe';
import { UserSchema } from '../zod/zod.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginRequestDto: LoginRequestDto): Promise<AccessToken> {
    const user = await this.authService.validateUser(loginRequestDto);
    return this.authService.login(user);
  }

  @Public()
  @UsePipes(new ZodPipe(UserSchema))
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(
    @Body(new ZodPipe(UserSchema)) user: RegisterRequestDto,
  ): Promise<AccessToken> {
    return await this.authService.register(user);
  }
}
