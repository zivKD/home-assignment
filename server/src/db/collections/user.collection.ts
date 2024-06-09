import { Injectable } from "@nestjs/common";
import { BaseCollection } from "./base.collection";
import { User } from "@interfaces/user.interface";
import { BaseDB } from "@interfaces/db.interface";

@Injectable()
export class UserCollection extends BaseCollection<User> {
    constructor(protected readonly baseDB: BaseDB){
        super(baseDB, 'users');
    }
}