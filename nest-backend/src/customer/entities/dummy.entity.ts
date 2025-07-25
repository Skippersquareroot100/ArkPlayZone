import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class DummyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
