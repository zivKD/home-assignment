import { Module } from '@nestjs/common';
import { UserModule } from './api/users/user.module';
import { PostModule } from './api/posts/post.module';

@Module({
  imports: [UserModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
