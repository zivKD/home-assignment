import { ApiProperty,  } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export interface IUser {
    id: number;
    name: string;
    avatar: string;
}

export class User implements IUser {
    @ApiProperty({type: Number})
    @IsNumber()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty({type: URL})
    avatar: string;
}