import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/ create-board.dto';
import { BoardsRepository } from './boards.repository';
import { Boards } from '../../entity/boards.entity'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(BoardsRepository)
   private boards : Board[] = [],
    private boardsrepository : BoardsRepository 
  ) {}
 
 

  getAllBoards() : Promise<Boards[]> {
    return this.boardsrepository.boardAll();
  }

  createBoard(createBoard: CreateBoardDto) {
    const { title, description } = createBoard
     const board : Board = {
       id : uuid(),
       title, 
       description ,
       status : BoardStatus.PUBLIC
     }
     this.boards.push(board);
     return board;
  }
  
  getBoardById(id : string) : Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id : string) : void {
      this.boards.filter((data) => data.id !== id);
  }

  updateBoardStatus(id : string , status : BoardStatus) : Board {
     const board = this.getBoardById(id);
     board.status = status;
     return board;
  }

}
