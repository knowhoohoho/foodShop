import { Injectable, NotFoundException } from "@nestjs/common";
import { Foods } from "../../entity/foods.entity";
import { EntityRepository, Repository } from "typeorm";




@EntityRepository(Foods)
export class FoodsRespository extends Repository<Foods> {
  async foodsAll() : Promise<Foods[]> {
    return await this.find();
  }

  async foodOne(id : string) : Promise<Foods> {
      const result = await this.findOne(id)
      if(!result) {
        throw new NotFoundException('해당 음식이 존재하지 않습니다')
      }
      return result
  }
}
