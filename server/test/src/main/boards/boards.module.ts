import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';


@Module({
  imports : [TypeOrmModule.forFeature([BoardsRepository])],
  providers: [BoardsService],
  controllers: [BoardsController]
})
export class BoardsModule {}
