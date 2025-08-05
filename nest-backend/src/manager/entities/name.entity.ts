import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from './staff.entity';
@Entity()
export class Name {
  @PrimaryGeneratedColumn()
  na_id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastName: string;

  @OneToOne(() => Staff, (staff) => staff.staff_id, {
    onDelete: 'CASCADE',
  })
  staff: Staff;
}
