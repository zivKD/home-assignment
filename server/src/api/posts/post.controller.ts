import { Post } from '@interfaces/post.interface';
import { Controller, Get, Param, Delete, Post as PostMethod, Patch, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UsePipes(new ValidationPipe({transform: true}))
  @ApiOkResponse({type: [Post]})
  getUsers(): Promise<Post[]> {
    return this.postService.getUsers();
  }

  @Get('/id/:id')
  @ApiOkResponse({type: Post})
  getUserById(@Param('id') id: string): Promise<Post> {
    return this.postService.getById(id);
  }

  @Delete('/id/:id')
  @ApiOkResponse({type: Boolean})
  deleteUserById(@Param('id') id: string): Promise<boolean> {
    return this.postService.deleteById(id);
  }

  @PostMethod('/add')
  @ApiOkResponse({type: Boolean})
  add(@Body() body: {data: Post}): Promise<boolean> {
    return this.postService.add(body.data);
  }

  @Patch('/edit')
  @ApiOkResponse({type: Boolean})
  edit(@Body() body: {data: Post}): Promise<boolean> {
    return this.postService.edit(body.data);
  }
}
