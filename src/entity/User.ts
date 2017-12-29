import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne, JoinColumn,
} from "typeorm";

import {Info} from './Info';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20
  })
  username: string;

  @Column({
    type: 'char',
    length: 32,
  })
  password: string;

  @Column({
    length: 50
  })
  email: string;
  // tslint:disable-next-line
  @OneToOne(() => Info) 
  @JoinColumn()
  info: Info;
}