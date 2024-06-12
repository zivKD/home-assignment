import { ILike } from "@interfaces/like.interface";
import { BaseService } from "./base.service";

export class LikeService extends BaseService<ILike> {
    getByPostId(postId: number): Promise<ILike[]> {
        return this.client.getByProperty<ILike[]>('postId', postId);
    }
}