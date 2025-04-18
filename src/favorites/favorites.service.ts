import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor( 
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite> ) {}

  create(createFavoriteDto: CreateFavoriteDto) {
    const favorite = this.favoriteRepository.create(createFavoriteDto); 
    return this.favoriteRepository.save(favorite);
  }

  findAll(): Promise<Favorite[]> {
    return this.favoriteRepository.find();
  }

  findOne(id: string):Promise<Favorite> {
    return this.favoriteRepository.findOne({where : {id}});
  }

  async update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    const favorite =await this.findOne(id); 
    if(!favorite){
      throw new NotFoundException(`this user : ${id} is not found`)
    }
    Object.assign(favorite, updateFavoriteDto); 
    return this.favoriteRepository.save(favorite);
  }

  async remove(id: string) {
    const favorite = await  this.findOne(id)
    return await this.favoriteRepository.remove(favorite)
  }
}
