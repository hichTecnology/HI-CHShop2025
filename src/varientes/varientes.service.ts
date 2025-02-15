import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVarienteDto } from './dto/create-variente.dto';
import { UpdateVarienteDto } from './dto/update-variente.dto';
import { Variente } from './entities/variente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VarientesService {
  constructor( 
    @InjectRepository(Variente)
    private varienteRepository: Repository<Variente> ) {}

  create(createVarienteDto: CreateVarienteDto) {
    const variente = this.varienteRepository.create(createVarienteDto); 
    return this.varienteRepository.save(variente);
  }

  findAll() : Promise<Variente[]> {
    return this.varienteRepository.find();
  }

  findOne(id: string) : Promise<Variente> {
    return this.varienteRepository.findOne({where : {id}});
  }

  async update(id: string, updateVarienteDto: UpdateVarienteDto) {
    const variente =await this.findOne(id); 
    if(!variente){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(variente, updateVarienteDto); 
    return this.varienteRepository.save(variente);
  }

  async remove(id: string) {
    const variente = await  this.findOne(id)
    return await this.varienteRepository.remove(variente)
  }
}
