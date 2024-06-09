import { Body, Controller, Delete, Post, Get, Param, Patch } from '@nestjs/common';
import { User } from '@interfaces/user.interface';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('Users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/All')
  @ApiOkResponse({type: [User]})
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/ById/:id')
  @ApiOkResponse({type: User})
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Delete('/ById/:id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.userService.deleteById(id);
  }

  @Post()
  @ApiOkResponse({type: User})
  add(@Body() body: User): Promise<void> {
    return this.userService.add(body);
  }

  @Patch()
  @ApiOkResponse({type: User})
  edit(@Body() body: {user: User}): Promise<void> {
    return this.userService.edit(body.user);
  }
}
