
import {
  Entity,
  Column, 
  PrimaryGeneratedColumn, 
  Repository, 
  OneToMany,
  JoinColumn
} from 'typeorm'
import { Boards } from '../entity/boards.entity'

@Entity()
export class User extends Repository<User>{
  @PrimaryGeneratedColumn()
  id :string;

  @Column()
  name : string;

  @Column()
  email : string;

  @OneToMany(type => Boards, (boards) => boards.user)
  boards : Boards[];
}