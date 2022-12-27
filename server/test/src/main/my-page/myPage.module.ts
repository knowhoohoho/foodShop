import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from 'src/entity/boards.entity';
import { MyPageController } from './myPage.controller';
import { MyPageService } from './myPage.service';


@Module({
  imports : [
    TypeOrmModule.forFeature([
      Boards,
    ])
  ],
  controllers : [MyPageController],
  providers : [MyPageService]
})
export class MyPageModule {}
