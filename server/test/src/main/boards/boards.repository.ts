import { EntityRepository, Repository } from "typeorm";
import { Boards } from 'src/entity/boards.entity'




@EntityRepository(Boards)
export class BoardsRepository extends Repository<Boards> {
  async boardAll() : Promise<any> {
     return await this.createQueryBuilder('board')
    .leftJoin('board.user', 'us')
    .getMany()
  }
}