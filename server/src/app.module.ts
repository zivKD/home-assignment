import { Module } from '@nestjs/common';
import { UserModule } from './api/users/user.module';
import { PostModule } from './api/posts/post.module';
import { LikeModule } from './api/likes/like.module';

@Module({
  imports: [UserModule, PostModule, LikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
