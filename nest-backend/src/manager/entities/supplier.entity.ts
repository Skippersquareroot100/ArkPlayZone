import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  supplier_id: number;

  @Column({ type: 'varchar', length: 100 })
  supplier_name: string;
}
