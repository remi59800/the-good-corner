import { Arg, ID, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Tag, TagCreateInput, TagUpdateInput } from '../entities/Tag';
import { StringValueNode } from 'graphql';
import { Ad, AdCreateInput, AdUpdateInput } from '../entities/Ad';
import { validate } from 'class-validator';

@Resolver()
export class TagsResolver {
  @Query(() => [Tag])
  async allTags(): Promise<Tag[]> {
    return await Tag.find({
      relations: {
        ads: true,
      },
    });
  }

  @Query(() => Tag, { nullable: true })
  async tag(@Arg('id', () => ID) id: number): Promise<Tag | null> {
    const tag = await Tag.findOne({
      where: { id: id },
      relations: {
        ads: true,
      },
    });
    return tag;
  }

  @Mutation(() => Tag)
  async createAd(
    @Arg('data', () => TagCreateInput) data: TagCreateInput
  ): Promise<Tag> {
    try {
      const newTag = new Tag();
      Object.assign(newTag, data);

      const errors = await validate(newTag);
      if (errors.length === 0) {
        await newTag.save();
        return newTag;
      } else {
        throw new Error(`Error occured : ${JSON.stringify(errors)}`);
      }
    } catch (error) {
      throw new Error('Create Ad went wrong!');
    }
  }

  @Mutation(() => Tag, { nullable: true })
  async updateTag(
    @Arg('id', () => ID) id: number,
    @Arg('data') data: TagUpdateInput
  ): Promise<Tag | null> {
    const tag = await Tag.findOne({
      where: { id: id },
    });
    if (tag) {
      Object.assign(tag, data);

      const errors = await validate(tag);
      if (errors.length === 0) {
        await tag.save();
      } else {
        throw new Error(`Error occured : ${JSON.stringify(errors)}`);
      }
    }
    return tag;
  }

  @Mutation(() => Tag, { nullable: true })
  async deleteTag(@Arg('id', () => ID) id: number): Promise<Tag | null> {
    const tag = await Tag.findOne({
      where: { id: id },
    });
    if (tag) {
      await tag.remove();
      tag.id = id;
    }
    return tag;
  }
}
