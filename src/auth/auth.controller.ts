import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../app.constants';
import { AccessToken, LoginRequestDto, RegisterRequestDto } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginRequestDto: LoginRequestDto): Promise<AccessToken> {
    const user = await this.authService.validateUser(loginRequestDto);
    return await this.authService.login(user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() user: RegisterRequestDto): Promise<AccessToken> {
    return await this.authService.register(user);
  }
}
