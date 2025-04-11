import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User, UserDto } from './users.type';

const MASKED_PASSWORD: string = '******';

@Injectable()
export class UserToDtoBatchTransformInterceptor
  implements NestInterceptor<User[], UserDto[]>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<User[]>,
  ): Observable<UserDto[]> {
    return next.handle().pipe(
      map((data) =>
        data.map((u) => ({
          id: u.id,
          username: u.username,
          email: u.email,
          role: u.role,
          password: MASKED_PASSWORD,
        })),
      ),
    );
  }
}
@Injectable()
export class UserToDtoTransformInterceptor
  implements NestInterceptor<User, UserDto>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<UserDto> {
    return next.handle().pipe(
      map((data) => ({
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role,
        password: MASKED_PASSWORD,
      })),
    );
  }
}
