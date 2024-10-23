import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", unique:true,length: 255 })
  title: string;

  @Column({ type: "text" })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
