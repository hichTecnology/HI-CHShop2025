import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor( 
    @InjectRepository(Review)
    private reviewRepository: Repository<Review> ) {}

  create(createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create(createReviewDto); 
    return this.reviewRepository.save(review);
  }

  findAll(): Promise< Review []> {
    return this.reviewRepository.find();
  }

  findOne(id: string): Promise< Review > {
    return this.reviewRepository.findOne({where : {id}});
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review =await this.findOne(id); 
    if(!review){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(review, updateReviewDto); 
    return this.reviewRepository.save(review);
  }

  async remove(id: string) {
    const review = await  this.findOne(id)
    return await this.reviewRepository.remove(review)
  }
}
