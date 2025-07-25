import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlanType {
  @PrimaryGeneratedColumn()
  ptype_id: number;

  @Column()
  premium: string;

  @Column()
  basic: string;
}
