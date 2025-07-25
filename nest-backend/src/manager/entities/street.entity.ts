import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Street {
  @PrimaryGeneratedColumn()
  st_id: number;

  @Column()
  street_no: string;

  @Column()
  street_name: string;

  @Column()
  apartment_name: string;
}
