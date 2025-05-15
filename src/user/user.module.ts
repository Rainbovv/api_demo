import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RepoModule } from '../repo/repo.module';
import { UserRepository } from './user.repository';
import { UserPgRepository } from '../repo/impl/pg/user.repository';

const USER_REPO_PROVIDER = {
  provide: UserRepository,
  useClass: UserPgRepository,
};

@Module({
  imports: [RepoModule],
  controllers: [UserController],
  providers: [UserService, USER_REPO_PROVIDER],
  exports: [UserService],
})
export class UserModule {}
