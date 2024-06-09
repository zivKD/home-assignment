import { Post } from '@interfaces/post.interface';
import { Controller, Get, Param, Delete, Post as PostMethod, Patch, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@Controller('Posts')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/All')
  @UsePipes(new ValidationPipe({transform: true}))
  @ApiOkResponse({type: [Post]})
  getUsers(): Promise<Post[]> {
    return this.postService.getUsers();
  }

  @Get('/ById/:id')
  @ApiOkResponse({type: Post})
  getUserById(@Param('id') id: string): Promise<Post> {
    return this.postService.getById(id);
  }

  @Delete('/ById/:id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.postService.deleteById(id);
  }

  @PostMethod()
  add(@Body() body: {post: Post}): Promise<void> {
    return this.postService.add(body.post);
  }

  @Patch()
  edit(@Body() body: {post: Post}): Promise<void> {
    return this.postService.edit(body.post);
  }
}
