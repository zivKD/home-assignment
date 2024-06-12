import { Like } from "@interfaces/like.interface";
import { Post } from "@interfaces/post.interface";
import { User } from "@interfaces/user.interface";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class PostAddBody {
    @ApiProperty({type: Post})
    @ValidateNested()
    @Type(() => Post)
    data: Post 
}
export class LikeAddBody {
    @ApiProperty({type: Like})
    @ValidateNested()
    @Type(() => Like)
    data: Like 
}
export class UserAddBody {
    @ApiProperty({type: User})
    @ValidateNested()
    @Type(() => User)
    data: User 
}