import { JwtPayload } from 'jsonwebtoken';
import { ParamsDictionary } from 'express-serve-static-core';
import { UnauthorizedException } from '@nestjs/common';

export interface AccessToken {
  access_token: string;
}

export interface RegisterRequestDto extends LoginRequestDto {
  username: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export enum Role {
  User = 1,
  Admin = 2,
}

export abstract class AuthCallback {
  abstract auth(token: JwtPayload, params: ParamsDictionary): boolean;
}

export class SelfHandleCallback implements AuthCallback {
  auth(token: JwtPayload, param: ParamsDictionary): boolean {
    if (token.sub != param.id && token.role != Role.Admin)
      throw new UnauthorizedException();

    return true;
  }
}

export class AdminCallback implements AuthCallback {
  auth(token: JwtPayload): boolean {
    if (token.role != Role.Admin) throw new UnauthorizedException();

    return true;
  }
}
