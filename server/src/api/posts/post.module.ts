import { Module } from '@nestjs/common';
import { DBModule } from 'src/db/db.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [DBModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
