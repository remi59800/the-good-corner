import { Arg, ID, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Tag } from '../entities/Tag';
import { StringValueNode } from 'graphql';
import { Ad, AdCreateInput, AdUpdateInput } from '../entities/Ad';
import { validate } from 'class-validator';
import {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
} from '../entities/Category';

@Resolver()
export class CategoriesResolver {
  @Query(() => [Category])
  async allCategories(): Promise<Category[]> {
    return await Category.find({
      relations: {
        ads: true,
      },
    });
  }

  @Query(() => Category, { nullable: true })
  async category(@Arg('id', () => ID) id: number): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id: id },
      relations: {
        ads: true,
      },
    });
    return category;
  }

  @Mutation(() => Category)
  async createAd(
    @Arg('data', () => CategoryCreateInput) data: CategoryCreateInput
  ): Promise<Category> {
    try {
      const newCategory = new Category();
      Object.assign(newCategory, data);

      const errors = await validate(newCategory);
      if (errors.length === 0) {
        await newCategory.save();
        return newCategory;
      } else {
        throw new Error(`Error occured : ${JSON.stringify(errors)}`);
      }
    } catch (error) {
      throw new Error('Create Ad went wrong!');
    }
  }

  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Arg('id', () => ID) id: number,
    @Arg('data') data: CategoryUpdateInput
  ): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id: id },
    });
    if (category) {
      Object.assign(category, data);

      const errors = await validate(category);
      if (errors.length === 0) {
        await category.save();
      } else {
        throw new Error(`Error occured : ${JSON.stringify(errors)}`);
      }
    }
    return category;
  }

  @Mutation(() => Category, { nullable: true })
  async deleteCategory(
    @Arg('id', () => ID) id: number
  ): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id: id },
    });
    if (category) {
      await category.remove();
      category.id = id;
    }
    return category;
  }
}
