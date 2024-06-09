import { UserCollection } from '@collections/user.collection';
import { User } from '@interfaces/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userCollection: UserCollection) { }

  async getUsers(): Promise<User[]> {
    return this.userCollection.getAll();
  }

  async getById(id: string): Promise<User> {
    return this.userCollection.getById(id);
  }

  async add(user: User) {
    return this.userCollection.add(user);
  }

  async deleteById(id: string) {
    return this.userCollection.deleteById(id);
  }

  async edit(user: User) {
    return this.userCollection.edit(user);
  }
}