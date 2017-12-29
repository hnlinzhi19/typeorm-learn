import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("info")
export class Info {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public comment: string;
}
