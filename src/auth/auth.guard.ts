import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'jsonwebtoken';
import { IS_PUBLIC_KEY, IS_ROLE_DEPENDENT } from './auth.constant';
import { AuthCallback } from './auth.type';
import { CONFIGURATION } from '../config/configuration';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: String(CONFIGURATION.jwt.secret),
      });
    } catch {
      throw new UnauthorizedException();
    }

    const callback: AuthCallback =
      this.reflector.getAllAndOverride<AuthCallback>(IS_ROLE_DEPENDENT, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (callback) {
      const decodedToken: JwtPayload = this.jwtService.decode(token);
      return callback.auth(decodedToken, request.params);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
