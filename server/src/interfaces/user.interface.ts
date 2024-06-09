import { ApiProperty,  } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class User {
    @ApiProperty({type: Number})
    @IsNumber()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty({type: URL})
    avatar: URL;
}