import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TIMEOUT } from 'dns';
import { Foods } from '../../entity/foods.entity';
import { FoodsRespository } from './foods.repository';

@Injectable()
export class FoodsService {
  constructor( @InjectRepository(FoodsRespository)
    private foodRepository : FoodsRespository) {}

  getFoodsAll() : Promise<Foods[]> {
    return this.foodRepository.foodsAll()
  }

  getFoodOne(id :string ) : Promise<Foods> {
    return this.foodRepository.foodOne(id)
  }

  



}
