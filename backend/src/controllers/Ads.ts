import { Controller } from '.';
import { Request, Response } from 'express';
import { Ad } from '../entities/Ad';
import { validate } from 'class-validator';

export class AdsController extends Controller {
  getAll = async (req: Request, res: Response) => {
    try {
      const ads = await Ad.find({
        relations: {
          category: true,
          tags: true,
        },
      });
      res.send(ads);
    } catch (error) {
      res.status(500).json({ success: false, message: 'GET went wrong!' });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const ad = await Ad.findOne({
        where: { id: Number(req.params.id) },
        relations: {
          category: true,
          tags: true,
        },
      });
      res.send(ad);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'GET Ad id went wrong!' });
    }
  };

  createOne = async (req: Request, res: Response) => {
    try {
      const newAd = new Ad();
      newAd.title = req.body.title;
      newAd.description = req.body.description;
      newAd.owner = req.body.owner;
      newAd.price = req.body.price;
      newAd.picture = req.body.picture;
      newAd.location = req.body.location;
      newAd.category = req.body.category;
      newAd.tags = req.body.tags;

      const errors = await validate(newAd);
      if (errors.length === 0) {
        await newAd.save();
        res.send(newAd);
      } else {
        res.status(400).json({ errors: errors });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'POST went wrong!' });
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      const ad = await Ad.findOne({ where: { id: Number(req.params.id) } });
      if (ad) {
        await ad.remove();
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'DELETE went wrong!' });
    }
  };

  patchOne = async (req: Request, res: Response) => {
    try {
      const ad = await Ad.findOne({
        where: { id: Number(req.params.id) },
      });

      if (ad) {
        Object.assign(ad, req.body, { id: ad.id });
        const errors = await validate(ad);
        if (errors.length === 0) {
          await ad.save();
          res.status(204).send();
        } else {
          res.status(400).json({ errors: errors });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: 'PATCH went wrong!' });
    }
  };
}
