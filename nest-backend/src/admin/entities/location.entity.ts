import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  location_id: number;

  @Column({ length: 50 })
  zone: string;

  @Column({ length: 10 })
  floor: string;
}
