import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerReview {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column()
  rating: number;

  @Column()
  comments: string;
}
