import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SingUpDto } from './dto/sing-up.dto';
import { SingInDto } from './dto/sing-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(singInDto: SingInDto) {
    const user = await this.usersService.findOneByUsername(singInDto.username);
    
    if (!user) {
      throw new HttpException('Username does not exists', 409);
    }

    const isPasswordValid = await bcrypt.compare(singInDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SingUpDto) {
    
    const user = await this.usersService.create(signUpDto);
    
    return user;
  }
}