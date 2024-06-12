import { ApiProperty,  } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export interface IUser {
    id: number;
    name: string;
    avatar: string;
}

export class User implements IUser {
    @ApiProperty({type: Number})
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({type: URL, required: false})
    @IsUrl()
    @IsOptional()
    avatar: string;
}