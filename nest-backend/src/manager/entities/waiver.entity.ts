import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Waiver {
  @PrimaryGeneratedColumn()
  waiver_id: number;

  @Column()
  emergency_contact: string;

  @Column()
  medical_condition: string;
}
