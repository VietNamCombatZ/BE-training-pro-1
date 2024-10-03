import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
