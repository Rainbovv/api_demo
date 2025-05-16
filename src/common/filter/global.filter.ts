import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';
import { Response } from 'express';

@Catch(Error)
export class GlobalFilter<T extends Error> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;
    if (exception instanceof ZodError) {
      const error = exception.errors[0];
      response.status(status).json({
        path: error.path[0],
        message: error.message,
        statusCode: status,
      });
    } else
      response.status(status).json({
        message: exception.message,
        statusCode: status,
      });
  }
}
