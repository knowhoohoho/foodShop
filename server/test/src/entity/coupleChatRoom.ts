import {
  Entity,
  CreateDateColumn,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class CoupleChatRoom {
  @PrimaryGeneratedColumn()
  icrId : string;

  @Column()
  clientId : string;

  @CreateDateColumn()
  createDt: Date;

  @UpdateDateColumn()
  updateDt : Date;

}