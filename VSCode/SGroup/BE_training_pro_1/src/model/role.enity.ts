import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ type: "varchar", unique: false, length: 255 })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
