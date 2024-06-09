import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FileDB } from '@dbclients/file.db';
import { UserCollection } from '@collections/user.collection';
import { BaseDB } from '@dbclients/base.db';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: BaseDB,
      useClass: FileDB
    },
    UserCollection, UserService],
})
export class UserModule { }
