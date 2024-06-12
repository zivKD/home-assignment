import { LikeCollection } from '@collections/like.collection';
import { PostCollection } from '@collections/post.collection';
import { Like } from '@interfaces/like.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikeService {
  constructor(private readonly likeCollection: LikeCollection, private readonly postCollection: PostCollection) {}

  async getAll(): Promise<Like[]> {
    return this.likeCollection.getAll();
  }

  async getById(id: string): Promise<Like> {
    return this.likeCollection.getById(parseInt(id));
  }

  async getByPostId(postId: string): Promise<Like[]> {
    return this.likeCollection.getByPostId(parseInt(postId));
  }


  async add(like: Like) {
    const existingLikes = await this.likeCollection.getByPostId(like.postId);
    const userExistingLike = existingLikes.find(existingLike => existingLike.userId === like.userId);
    if(userExistingLike) {
      await this.likeCollection.deleteById(userExistingLike.id);
      return false;
    }
    
    await this.likeCollection.add(like);
    const post = await this.postCollection.getById(like.postId);
    if(post.likeCounter === undefined) {
      post.likeCounter = 1;
    } else { post.likeCounter = post.likeCounter + 1; }
    return await this.postCollection.edit(post);
  }

  async deleteById(id: string) {
    return this.likeCollection.deleteById(parseInt(id));
  }

  async edit(like: Like) {
    return this.edit(like);
  }
}