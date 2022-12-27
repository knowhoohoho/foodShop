import { Controller, Get, Post , Body, Param, Delete, Patch, } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/ create-board.dto';
import { Boards } from '../../entity/boards.entity'

@Controller('boards')
export class BoardsController {
  constructor(private boardService : BoardsService) {}

  @Get('/')
  getAllBoard() : Promise<Boards[]> {
    return this.boardService.getAllBoards();
  }

  @Post('/create')
  createBoard(
    @Body() createBoardDto : CreateBoardDto
  ) : Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id : string) :Board {
    return this.boardService.getBoardById(id)
  }

  @Delete('/:id')
  delteBoard(@Param('id') id : string) : void {
    this.boardService.deleteBoard(id)
  }
  
  @Patch('/:id/status')
  updateStatus(
    @Param('id') id : string,
    @Body('status') status : BoardStatus
    ) {
      return this.boardService.updateBoardStatus(id, status)
    }

  
  
}
