import { Module } from '@nestjs/common';
import { DBModule } from 'src/db/db.module';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [DBModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule { }
