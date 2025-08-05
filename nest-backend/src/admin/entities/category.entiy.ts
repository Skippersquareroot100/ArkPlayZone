import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  cat_id: number;

  @Column({ length: 100 })
  cat_name: string;

  @ManyToMany(() => Activity, activity => activity.categories)
  activities: Activity[];
}
