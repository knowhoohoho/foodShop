import { Controller, Get, Param } from '@nestjs/common';
import { FoodsService } from './foods.service'
import { Foods } from '../../entity/foods.entity'

@Controller('foods')
export class FoodsController {
  constructor(private foodsService : FoodsService) {}

  @Get('/')
  foodsAll() : Promise<Foods[]> {
    return this.foodsService.getFoodsAll()
  }

  @Get('search/:id')
  foodSearch(@Param() id:string ) : Promise<Foods> {
    return this.foodsService.getFoodOne(id)
  }

}
