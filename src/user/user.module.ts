import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbModule } from '../db/db.module';
import { UserRepository } from './user.repository';
import { UserPgRepository } from '../db/repo/pg/user.repository';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserPgRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
