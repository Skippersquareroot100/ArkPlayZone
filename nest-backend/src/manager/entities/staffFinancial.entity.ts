import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from './staff.entity';
@Entity()
export class StaffFinancial {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  salary_date: Date;
  @Column('decimal', { precision: 10, scale: 2 })
  netSalary: number;
  @ManyToOne(() => Staff, (staff) => staff.financialRecords)
  @JoinColumn()
  staff: Staff;
}
