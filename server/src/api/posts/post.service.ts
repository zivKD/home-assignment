import { PostCollection } from '@collections/post.collection';
import { Post } from '@interfaces/post.interface';
import { User } from '@interfaces/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(private readonly postCollection: PostCollection) {}

  async getUsers(): Promise<Post[]> {
    return this.postCollection.getAll();
  }

  async getById(id: number): Promise<Post> {
    return this.postCollection.getById(id);
  }

  async add(post: Post) {
    return this.postCollection.add(post);
  }

  async deleteById(id: number) {
    return this.postCollection.deleteById(id);
  }

  async edit(post: Post) {
    return this.postCollection.edit(post);
  }
}