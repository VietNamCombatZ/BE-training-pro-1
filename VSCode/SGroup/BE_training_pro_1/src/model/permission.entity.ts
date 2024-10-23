import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255})
  name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable()
  roles: Role[];
}
