import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    //inject repository user
    @InjectRepository(User) private userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    
    //find user by username
    const userFoundUsername = await this.userRepository.findOneBy({username: createUserDto.username});
    //return exception if user found
    if(userFoundUsername){
      throw new HttpException('Username already exists', 409);
    }

    const userFoundEmail = await this.userRepository.findOneBy({email: createUserDto.email});
    if(userFoundEmail){
      throw new HttpException('Email already exists', 409);
    }

    //hash password
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userRepository.save(createUserDto);
    
    const {password, ...result} = newUser;
    
    return result;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({email});
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({email});
  }
  
  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({username});
  }


  //findByJwt(payload: any) {
  //  return this.userRepository.findOneBy({id: payload.sub});
  //}

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
