import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column()
  message: string;
  @Column()
  for: string;
  @Column()
  date: Date;
}
