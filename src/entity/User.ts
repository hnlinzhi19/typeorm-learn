import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

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
}