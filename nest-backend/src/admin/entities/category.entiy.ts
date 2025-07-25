import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  cat_id: number;

  @Column({ length: 100 })
  cat_name: string;
}
