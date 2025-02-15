import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor( 
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin> ) {}

    
  create(createAdminDto: CreateAdminDto) {
    const admin = this.adminRepository.create(createAdminDto); 
    return this.adminRepository.save(admin);
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  findOne(id: string): Promise<Admin> {
    return this.adminRepository.findOne({where : {id}});
  }
  async findOneAuth(email: string): Promise<Admin | undefined> {
    return this.adminRepository.findOne({where :{email}});
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin =await this.findOne(id); 
    if(!admin){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(admin, updateAdminDto); 
    return this.adminRepository.save(admin);
  }

  async remove(id: string ) {
    const order = await  this.findOne(id)
    return await this.adminRepository.remove(order)
  }
}
