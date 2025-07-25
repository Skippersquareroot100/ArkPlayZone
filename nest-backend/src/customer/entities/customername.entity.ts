import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class CustomerName {
  @PrimaryGeneratedColumn()
  na_id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastName: string;
}
