import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsController } from './foods.controller';
import { FoodsRespository } from './foods.repository';
import { FoodsService } from './foods.service';

@Module({
  imports : [TypeOrmModule.forFeature([FoodsRespository])],
  controllers: [FoodsController],
  providers: [FoodsService]
})
export class FoodsModule {}
