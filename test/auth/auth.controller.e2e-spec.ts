import { RegisterRequestDto } from '../../src/auth/auth.type';
import { App } from 'supertest/types';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { ZodFilter } from '../../src/zod/zod.filter';
import fn = jest.fn;

describe('AuthController', () => {
  type Response = {
    body: {
      path: string;
      message: string;
    };
  };
  let requestDto: RegisterRequestDto;
  let app: INestApplication<App>;
  const authService = { register: () => fn() };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();
    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new ZodFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    requestDto = {
      username: 'dummyName',
      password: 'password',
      email: 'dummy@dummy.com',
    };
  });

  describe('signUp', () => {
    let response: Response;

    it('should return invalid email error', async () => {
      requestDto.email = 'dummy';
      response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestDto)
        .expect(400);

      expect(response.body.path).toBe('email');
      expect(response.body.message).toBe('Invalid email');
    });

    it(
      'should return invalid password error - ' +
        'String must contain at least 8 character(s)',
      async () => {
        requestDto.password = 'dummy';
        response = await request(app.getHttpServer())
          .post('/auth/register')
          .send(requestDto)
          .expect(400);

        expect(response.body.path).toBe('password');
        expect(response.body.message).toBe(
          'String must contain at least 8 character(s)',
        );
      },
    );

    it(
      'should return invalid username error - ' +
        'String must contain at least 6 character(s)',
      async () => {
        requestDto.username = 'dummy';
        response = await request(app.getHttpServer())
          .post('/auth/register')
          .send(requestDto)
          .expect(400);

        expect(response.body.path).toBe('username');
        expect(response.body.message).toBe(
          'String must contain at least 6 character(s)',
        );
      },
    );

    it('should execute successfully', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestDto)
        .expect(200);
    });
  });
});
