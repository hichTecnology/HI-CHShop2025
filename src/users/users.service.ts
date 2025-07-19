import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor( 
    @InjectRepository(User)
    private userRepository: Repository<User> ,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ access_token: string,id : string }> {
    const user =  this.userRepository.create(createUserDto); 
    const save = await this.userRepository.save(user);
    
    const payload = {user };
    const token =  this.jwtService.sign(payload);
  
      // 3. Restituisci il token e le informazioni dell'utente
      
      return {
        access_token:  token,
        id : save.id
      };
    
  }

  findAll() : Promise< User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise< User>  {
    return this.userRepository.findOne({where : {id},relations:['favorites.product','carts.product','addresses','orders.carts.product','orders.payment','orders.shipment','supportRequests.messages.userSender','supportRequests.messages.adminSender']});
  }

  findUserRequest(id: string): Promise< User>  {
    return this.userRepository.findOne({where : {id},relations:{supportRequests: {messages: {userSender: true, adminSender: true}}}});
  }

  async findOneAuth(email: string): Promise<User | undefined> {
      return this.userRepository.findOne({where :{email}});
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
