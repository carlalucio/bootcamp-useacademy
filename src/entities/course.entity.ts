import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'courses' })
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: false })
  description!: string;

  @Column({ type: 'float', nullable: false })
  value!: number;

  @Column({ type: 'varchar', nullable: false })
  image!: string;

  @Column({ type: 'boolean', nullable: false })
  disponibility!: boolean;

  @Column({ type: 'varchar', nullable: false })
  category_id!: string;
}