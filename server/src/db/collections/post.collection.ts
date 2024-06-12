import { BaseDB } from "@dbclients/base.db";
import { Post } from "@interfaces/post.interface";
import { Injectable } from "@nestjs/common";
import { BaseCollection } from "./base.collection";

@Injectable()
export class PostCollection extends BaseCollection<Post> {
    constructor(protected readonly baseDB: BaseDB){
        super(baseDB, 'posts');
    }
}