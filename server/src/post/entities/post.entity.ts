import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;
  
  @Column()
  content: string;

  @Column()
  createdBy: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
