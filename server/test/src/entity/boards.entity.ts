import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Repository, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Unique,
  JoinColumn
} from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Boards {
   @PrimaryGeneratedColumn()
   id : string;

   @Column()
   user_id : string;

   @Column()
   name : string;

   @Column()
   content : string;

   @Column()
   view : number;

  @CreateDateColumn()
  createAt : Date;

  @UpdateDateColumn()
  updateAt : Date;
  
  @DeleteDateColumn()
  deletedAt : Date | null;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn()
  user : User

  
}
