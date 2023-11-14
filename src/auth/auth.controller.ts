import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/sing-up.dto';
import { SingInDto } from './dto/sing-in.dto';
import { Public } from 'src/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SingInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  signUp(@Body() signUpDto: SingUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


}