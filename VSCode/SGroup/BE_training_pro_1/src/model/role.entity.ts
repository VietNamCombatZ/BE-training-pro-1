import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Permission } from "./permission.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255 })
  roleName: string;

  @Column({type:"text", nullable: true })
  description: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}
