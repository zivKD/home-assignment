
import { Module } from '@nestjs/common';
import { FileDB } from '@dbclients/file.db';
import { BaseDB } from '@dbclients/base.db';
import { LikeCollection } from '@collections/like.collection';
import { PostCollection } from '@collections/post.collection';
import { UserCollection } from '@collections/user.collection';

@Module({
  imports: [],
  providers: [
    {
      provide: BaseDB,
      useClass: FileDB
    },
    LikeCollection, PostCollection, UserCollection],
    exports: [LikeCollection, PostCollection, UserCollection]
})
export class DBModule { }
