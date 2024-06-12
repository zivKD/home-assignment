import { ApiProperty,  } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export interface IPost {
    id: number;
    userId: number;
    date: string;
    content: string;
    imageUrl?: string;
    likeCounter?: number;
}

export class Post implements IPost {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number})
    id: number;
    @ApiProperty({type: Number})
    @IsNumber()
    @IsNotEmpty()
    userId: number;
    @ApiProperty({type: String})
    @IsDateString()
    @IsNotEmpty()
    date: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
    @ApiProperty({type: String, required: false})
    @IsString()
    @IsOptional()
    imageUrl?: string;
    @ApiProperty({type: Number})
    @IsNumber()
    @IsOptional()
    likeCounter?: number;
}