import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SavedProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  category!: string;

  @Column()
  author!: string;

  @Column()
  image_url!: string;
}
