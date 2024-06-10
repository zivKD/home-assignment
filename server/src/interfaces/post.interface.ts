import { ApiProperty,  } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export interface IPost {
    id: number;
    userId: number;
    date: string;
    content: string;
    imageUrl?: string;
    likeCounter: number;
}

export class Post implements IPost {
    @IsNumber()
    @ApiProperty({type: Number})
    id: number;
    @ApiProperty({type: Number})
    userId: number;
    @ApiProperty({type: String})
    date: string;
    @ApiProperty()
    content: string;
    @ApiProperty({type: URL, required: false})
    imageUrl?: string;
    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @IsOptional()
    @ApiProperty({type: Number})
    likeCounter: number = 0;
}