import { Column, Entity,PrimaryGeneratedColumn, Repository } from "typeorm";


@Entity()
export class Foods extends Repository<Foods>{
  @PrimaryGeneratedColumn()
  id : string;

  @Column()
  name: string;

  @Column()
  address : string;

  @Column()
  price : number;

  

  



}