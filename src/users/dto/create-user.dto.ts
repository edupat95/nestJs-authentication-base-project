import { Unique } from 'typeorm';
import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer'; 

export class CreateUserDto {
    
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
