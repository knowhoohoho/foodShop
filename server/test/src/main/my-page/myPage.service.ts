import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boards } from 'src/entity/boards.entity'
import { Repository } from 'typeorm';

@Injectable()
export class MyPageService {
  constructor(

      @InjectRepository( Boards )
      private readonly myListRepository : Repository<Boards>,
  ) {}





  async DayList(email : string)  {
    return await  this.myListRepository.findOne(email) 
  }
}
