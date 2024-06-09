import { ApiProperty,  } from '@nestjs/swagger';

export class Like {
    @ApiProperty({type: Number})
    userId: number;
    @ApiProperty({type: Number})
    postId: number;
    @ApiProperty({type: Number})
    id: number;
}