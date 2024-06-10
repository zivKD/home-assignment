import { ApiProperty,  } from '@nestjs/swagger';

export interface ILike {
    userId: number;
    postId: number;
    id: number;
}

export class Like implements ILike {
    @ApiProperty({type: Number})
    userId: number;
    @ApiProperty({type: Number})
    postId: number;
    @ApiProperty({type: Number})
    id: number;
}