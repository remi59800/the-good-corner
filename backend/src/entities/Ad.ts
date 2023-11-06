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
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { ObjectId } from './ObjectId';

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100, {
    message: 'The title must be between 3 and 100 characters long',
  })
  @Field()
  title!: string;

  @Column({ length: 2500, nullable: true })
  @Field()
  description!: string;

  @Column({ length: 100 })
  @Field()
  owner!: string;

  @Column()
  @Field()
  price!: number;

  @Column({ length: 100, nullable: true })
  @Field()
  picture!: string;

  @Column({ length: 100 })
  @Field()
  location!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.ads)
  @Field(() => Category, { nullable: true })
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads, { cascade: ['remove'] })
  // check with SQLite extension! If you forget this following line, the
  // pivot table won't be generated
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[];
}

@InputType()
export class AdCreateInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  owner!: string;

  @Field(() => Int)
  price!: number;

  @Field()
  picture!: string;

  @Field()
  location!: string;

  @Field(() => ObjectId)
  category!: ObjectId;

  @Field(() => [ObjectId], { nullable: true })
  tags!: ObjectId[];
}

@InputType()
export class AdUpdateInput {
  @Field({ nullable: true })
  title!: string;

  @Field({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  owner!: string;

  @Field(() => Int, { nullable: true })
  price!: number;

  @Field({ nullable: true })
  picture!: string;

  @Field({ nullable: true })
  location!: string;

  @Field(() => ObjectId, { nullable: true })
  category!: ObjectId;

  @Field(() => [ObjectId], { nullable: true })
  tags!: ObjectId[];
}

@InputType()
export class AdsWhere {
  @Field(() => [ID], { nullable: true })
  categoryIn?: number[];

  @Field(() => String, { nullable: true })
  searchTitle?: string;

  @Field(() => Int, { nullable: true })
  priceGte?: number;

  @Field(() => Int, { nullable: true })
  priceLte?: number;
}
