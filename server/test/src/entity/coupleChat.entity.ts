import {
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  PrimaryColumn
} from 'typeorm'



@Entity()
export class CoupleChat {
   @PrimaryGeneratedColumn()
   icrId : string;

   
}