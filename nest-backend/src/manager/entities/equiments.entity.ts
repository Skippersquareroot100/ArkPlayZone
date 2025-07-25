import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Room } from '../../admin/entities/room.entity';
import { Usage } from '../../employee/entities/usage.entity';
import { Maintenance } from '../../employee/entities/maintenance.entity';
import { Supplier } from './supplier.entity';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  equip_id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => Usage)
  @JoinColumn({ name: 'usage_id' })
  usage: Usage;

  @ManyToOne(() => Maintenance)
  @JoinColumn({ name: 'maintanace_id' })
  maintenance: Maintenance;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}
