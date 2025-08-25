import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MobileActivity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  photo: string;
  @Column()
  description: string;
}
