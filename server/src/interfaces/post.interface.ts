import { ApiProperty,  } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class Post {
    @IsNumber()
    @ApiProperty({type: Number})
    id: number;
    @ApiProperty({type: Number})
    userId: number;
    @ApiProperty({type: Date})
    date: Date;
    @ApiProperty()
    content: string;
    @ApiProperty({type: URL, required: false})
    imageUrl?: URL;
    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @IsOptional()
    @ApiProperty({type: Number})
    likeCounter: number = 0;
}