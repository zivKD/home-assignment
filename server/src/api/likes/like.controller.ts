import { Controller, Get, Param, Delete, Post as PostMethod, Patch, Body, UsePipes } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { Like } from '@interfaces/like.interface';

@Controller('likes')
@ApiTags('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get()
  @ApiOkResponse({type: [Like]})
  getUsers(): Promise<Like[]> {
    return this.likeService.getAll();
  }

  @Get('/id/:id')
  @ApiOkResponse({type: Like})
  getById(@Param('id') id: number): Promise<Like> {
    return this.likeService.getById(id);
  }

  @Delete('/id/:id')
  @ApiOkResponse({type: Boolean})
  deleteById(@Param('id') id: number): Promise<boolean> {
    return this.likeService.deleteById(id);
  }

  @PostMethod('/add')
  @ApiOkResponse({type: Boolean})
  add(@Body() body: {data: Like}): Promise<boolean> {
    return this.likeService.add(body.data);
  }

  @Patch('/edit')
  @ApiOkResponse({type: Boolean})
  edit(@Body() body: {data: Like}): Promise<boolean> {
    return this.likeService.edit(body.data);
  }  
  
  @Get('/postId/:id')
  @ApiOkResponse({type: [Like]})
  getByPostId(@Param('id') postId: number): Promise<Like[]> {
    return this.likeService.getByPostId(postId);
  }
}