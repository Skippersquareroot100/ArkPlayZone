import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerCredentials {
  @PrimaryGeneratedColumn()
  credid: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  profile_photo: string;
}
