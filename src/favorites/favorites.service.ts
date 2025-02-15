import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
