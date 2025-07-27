import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FineType {
  @PrimaryGeneratedColumn()
  finetype_id:  number;

  @Column({ type: 'decimal' })
  amount: number;

  @Column('text')
  damage: string;
}
