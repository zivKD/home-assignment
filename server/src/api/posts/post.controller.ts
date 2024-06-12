import { Post } from '@interfaces/post.interface';
import { Body, Controller, Delete, Get, Param, Patch, Post as PostMethod } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostAddBody } from '../schemes/add.body';
import { PostEditBody } from '../schemes/edit.body';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOkResponse({type: [Post]})
  getUsers(): Promise<Post[]> {
    return this.postService.getUsers();
  }

  @Get('/id/:id')
  @ApiOkResponse({type: Post})
  getUserById(@Param('id') id: number): Promise<Post> {
    return this.postService.getById(id);
  }

  @Delete('/id/:id')
  @ApiOkResponse({type: Boolean})
  deleteUserById(@Param('id') id: number): Promise<boolean> {
    return this.postService.deleteById(id);
  }

  @PostMethod('/add')
  @ApiOkResponse({type: Boolean})
  add(@Body() body: PostAddBody): Promise<boolean> {
    return this.postService.add(body.data);
  }

  @Patch('/edit')
  @ApiOkResponse({type: Boolean})
  edit(@Body() body: PostEditBody): Promise<boolean> {
    return this.postService.edit(body.data);
  }
}
