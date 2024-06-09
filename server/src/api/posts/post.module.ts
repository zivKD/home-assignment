import { Module } from '@nestjs/common';
import { FileDB } from '@dbclients/file.db';
import { UserCollection } from '@collections/user.collection';
import { BaseDB } from '@dbclients/base.db';
import { PostCollection } from '@collections/post.collection';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [
    {
      provide: BaseDB,
      useClass: FileDB
    },
    PostCollection, PostService],
})
export class PostModule { }
