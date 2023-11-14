import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword, MinLength, isString, MaxLength } from 'class-validator';

export class SingUpDto {
    
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    username: string;

    @IsString()
    @MinLength(8)
    @Transform(({ value }) => value.trim()) // Quita los espacios en blanco
    @MaxLength(20)
    @IsStrongPassword()
    password: string;
    
    @IsEmail()
    email: string;
}