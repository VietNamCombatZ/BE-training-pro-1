import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DateTimeEntity } from "./base/dateTimeEntity";
import { Post } from "./post.entity";

@Entity()
export class User extends DateTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  username: string;

  @Column({ type: "varchar", length: 255 })
  public password: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  public email: string;

  @Column ({type: "varchar", length: 255})
  public role : string;

  @Column({ type: "varchar", length: 255,nullable: true })
  public accessToken: string;

  @Column({ type: "datetime" , nullable: true})
  public accessTokenExpireAt: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  public refreshToken: string;

  @Column({ type: "datetime", nullable: true })
  public refreshTokenExpireAt: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  public resetPasswordToken: string;

  @Column({ type: "datetime", nullable: true })
  public resetPasswordTokenExpireAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
