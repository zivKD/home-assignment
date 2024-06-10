import { Controller, Get, Param, Delete, Post as PostMethod, Patch, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { Like } from '@interfaces/like.interface';

@Controller('likes')
@ApiTags('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get()
  @UsePipes(new ValidationPipe({transform: true}))
  @ApiOkResponse({type: [Like]})
  getUsers(): Promise<Like[]> {
    return this.likeService.getAll();
  }

  @Get('/id/:id')
  @ApiOkResponse({type: Like})
  getById(@Param('id') id: string): Promise<Like> {
    return this.likeService.getById(id);
  }

  @Delete('/id/:id')
  @ApiOkResponse({type: Boolean})
  deleteById(@Param('id') id: string): Promise<boolean> {
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
  @UsePipes(new ValidationPipe({transform: true}))
  @ApiOkResponse({type: [Like]})
  getByPostId(@Param('id') postId: string): Promise<Like[]> {
    return this.likeService.getByPostId(postId);
  }
}