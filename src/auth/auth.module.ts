import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { CONFIGURATION } from '../config/configuration';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: String(CONFIGURATION.jwt.secret),
      signOptions: { expiresIn: '600000s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
