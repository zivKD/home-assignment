import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FileDB } from '@dbclients/file.db';
import { UserCollection } from '@collections/user.collection';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [FileDB, UserCollection, UserService],
})
export class UserModule {}
