import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './api/users/user.module';
import { PostModule } from './api/posts/post.module';
import { LikeModule } from './api/likes/like.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [UserModule, PostModule, LikeModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
