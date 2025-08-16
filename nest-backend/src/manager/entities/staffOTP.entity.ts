import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Staff } from './staff.entity';

@Entity({ name: 'staff_otp' })
export class StaffOTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'otp' })
  OTP: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Column({ default: false })
  used: boolean;

  @OneToOne(() => Staff, (staff) => staff.otp)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;
}
