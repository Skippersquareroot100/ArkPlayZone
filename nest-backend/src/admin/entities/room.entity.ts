import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  capacity: number;

  @Column()
  rate: number;
}
