import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotificationType {
  @PrimaryGeneratedColumn()
  nottype_id: number;

  @Column()
  promotion: string;

  @Column()
  reminder: string;
}
