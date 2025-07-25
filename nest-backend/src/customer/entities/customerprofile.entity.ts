import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerProfile {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column()
  loyality_points: number;

  @Column()
  achivement: string;
}
