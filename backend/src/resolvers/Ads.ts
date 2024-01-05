import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Ad, AdCreateInput, AdUpdateInput, AdsWhere } from '../entities/Ad';
import { validate } from 'class-validator';
import { In, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';
import { merge } from '../utils';
import { ContextType } from '../auth';

@Resolver()
export class AdsResolver {
  @Query(() => [Ad])
  async allAds(
    // On ajoute des filtres comme on pourrait le faire en SQL
    @Arg('where', { nullable: true }) where?: AdsWhere,
    // take gère le nombre d'éléments par page
    @Arg('take', () => Int, { nullable: true }) take?: number,
    //skip permet de gérer à quelle page je suis(je loupe tel nombre d'éléments donc ça définit à quelle page je suis)
    @Arg('skip', () => Int, { nullable: true }) skip?: number
  ): Promise<Ad[]> {
    const queryWhere: any = {};

    if (where?.categoryIn) {
      queryWhere.category = { id: In(where.categoryIn) };
    }

    if (where?.searchTitle) {
      queryWhere.title = Like(`%${where.searchTitle}%`);
    }

    if (where?.priceGte) {
      queryWhere.price = MoreThanOrEqual(Number(where.priceGte));
    }

    if (where?.priceLte) {
      queryWhere.price = LessThanOrEqual(Number(where.priceLte));
    }

    /* const order: any = {};
    if (
      typeof req.query.orderByTitle === "string" &&
      ["ASC", "DESC"].includes(req.query.orderByTitle)
    ) {
      order.title = req.query.orderByTitle; // req.query.orderByTitle = ASC | DESC
    }

    if (
      typeof req.query.orderByPrice === "string" &&
      ["ASC", "DESC"].includes(req.query.orderByPrice)
    ) {
      order.price = req.query.orderByPrice; // req.query.orderByTitle = ASC | DESC
    } */

    const ads = await Ad.find({
      take: take ?? 50,
      skip,
      where: queryWhere,
      //order,
      relations: {
        category: true,
        tags: true,
        createdBy: true,
      },
    });
    return ads;
  }

  @Query(() => Int)
  async allAdsCount(
    // On ajoute des filtres comme on pourrait le faire en SQL
    @Arg('where', { nullable: true }) where?: AdsWhere
  ): Promise<number> {
    const queryWhere: any = {};

    if (where?.categoryIn) {
      queryWhere.category = { id: In(where.categoryIn) };
    }

    if (where?.searchTitle) {
      queryWhere.title = Like(`%${where.searchTitle}%`);
    }

    if (where?.priceGte) {
      queryWhere.price = MoreThanOrEqual(Number(where.priceGte));
    }

    if (where?.priceLte) {
      queryWhere.price = LessThanOrEqual(Number(where.priceLte));
    }

    const count = await Ad.count({
      where: queryWhere,
    });
    return count;
  }

  @Query(() => Ad, { nullable: true })
  async ad(@Arg('id', () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
      relations: {
        category: true,
        tags: true,
      },
    });
    return ad;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Ctx() context: ContextType,
    @Arg('data', () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    try {
      const newAd = new Ad();
      Object.assign(newAd, data, {
        createdBy: context.user,
      });

      const errors = await validate(newAd);
      if (errors.length === 0) {
        await newAd.save();
        return newAd;
      } else {
        throw new Error(`Error occured : ${JSON.stringify(errors)}`);
      }
    } catch (error) {
      throw new Error('Create Ad went wrong!');
    }
  }

  @Authorized()
  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Ctx() context: ContextType,
    @Arg('id', () => ID) id: number,
    @Arg('data') data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
      relations: { tags: true, createdBy: true },
    });

    if (ad && ad.createdBy.id === context.user?.id) {
      merge(ad, data);

      const errors = await validate(ad);
      if (errors.length === 0) {
        await ad.save();
        return await Ad.findOne({
          where: { id: id },
          relations: {
            category: true,
            tags: true,
          },
        });
      } else {
        throw new Error(`Error occured : ${JSON.stringify(errors)}`);
      }
    } else {
      return null;
    }
  }

  @Authorized()
  @Mutation(() => Ad, { nullable: true })
  async deleteAd(@Arg('id', () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
    });
    if (ad) {
      await ad.remove();
      ad.id = id;
    }
    return ad;
  }
}
