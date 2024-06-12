import { ApiProperty,  } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export interface ILike {
    userId: number;
    postId: number;
    id: number;
}

export class Like implements ILike {
    @ApiProperty({type: Number})
    @IsNumber()
    @IsNotEmpty()
    userId: number;
    @ApiProperty({type: Number})
    @IsNumber()
    @IsNotEmpty()
    postId: number;
    @ApiProperty({type: Number})
    @IsNumber()
    @IsNotEmpty()
    id: number;
}