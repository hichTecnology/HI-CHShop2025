import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor( 
    @InjectRepository(User)
    private userRepository: Repository<User> ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto); 
    return this.userRepository.save(user);
  }

  findAll() : Promise< User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise< User>  {
    return this.userRepository.findOne({where : {id}});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user =await this.findOne(id); 
    if(!user){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(user, updateUserDto); 
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await  this.findOne(id)
    return await this.userRepository.remove(user)
  }
}
