import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { Category } from './Category';
import { Tag } from './Tag';

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100, {
    message: 'The title must be between 3 and 100 characters long',
  })
  title!: string;

  @Column({ length: 2500, nullable: true })
  description!: string;

  @Column({ length: 100 })
  owner!: string;

  @Column()
  price!: number;

  @Column({ length: 100, nullable: true })
  picture!: string;

  @Column({ length: 100 })
  location!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.ads)
  category!: Category;

  @ManyToMany(() => Tag, (tag: { ads: any }) => tag.ads)
  // check with SQLite extension! If you forget this following line, the
  // pivot table won't be generated
  @JoinTable()
  tags!: Tag[];
}
