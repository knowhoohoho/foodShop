import { Entity, Column, PrimaryGeneratedColumn, Repository } from 'typeorm'

@Entity()
export class Trainer extends Repository<Trainer> {
  @PrimaryGeneratedColumn()
  id :string;

  @Column()
  name : string;
}