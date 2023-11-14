import { IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class SingInDto {
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    username: string;

    @IsString()
    @MinLength(8)
    @Transform(({ value }) => value.trim()) // Quita los espacios en blanco
    @MaxLength(20)
    password: string;
}