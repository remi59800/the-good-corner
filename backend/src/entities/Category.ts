import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ad } from './Ad';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Field()
  name!: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad])
  ads!: Ad[];
}

@InputType()
export class CategoryCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class CategoryUpdateInput {
  @Field({ nullable: true })
  name!: string;
}
