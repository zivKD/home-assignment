import { UserCollection } from '@collections/user.collection';
import { User } from '@interfaces/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userCollection: UserCollection) {}

  async getUsers(): Promise<User[]> {
    return this.userCollection.getAll();
  }
}