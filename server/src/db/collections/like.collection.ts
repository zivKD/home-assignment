import { BaseDB } from "@dbclients/base.db";
import { Post } from "@interfaces/post.interface";
import { Injectable } from "@nestjs/common";
import { BaseCollection } from "./base.collection";
import { Like } from "@interfaces/like.interface";
import { User } from "@interfaces/user.interface";

@Injectable()
export class LikeCollection extends BaseCollection<Like> {
    constructor(protected readonly baseDB: BaseDB){
        super(baseDB, 'likes');
    }

    public async getByPostId(postId: number): Promise<Like[]> {
        return this.baseDB.getByProperty(this.collectionName, 'postId', postId);
    }
}