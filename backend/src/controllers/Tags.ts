import { Controller } from '.';
import { Request, Response } from 'express';
import { Tag } from '../entities/Tag';

export class TagsController extends Controller {
  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await Tag.find();
      res.send(categories);
    } catch (error) {
      res.status(500).json({ success: false, message: 'GET went wrong!' });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const tag = await Tag.findOne({
        where: { id: Number(req.params.id) },
      });
      res.send(Tag);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'GET Tag id went wrong!' });
    }
  };

  createOne = async (req: Request, res: Response) => {
    try {
      const newCateg = new Tag();

      (newCateg.name = req.body.name), newCateg.save();
      res.send(newCateg);
    } catch (error) {
      res.status(500).json({ success: false, message: 'POST went wrong!' });
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      //autre façon de delete comparé à l'Ad
      const tag = await Tag.findOne({
        where: { id: Number(req.params.id) },
      });
      if (tag) {
        await tag.remove();
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'DELETE went wrong!' });
    }
  };

  patchOne = async (req: Request, res: Response) => {
    const categId = +req.params.id;
    const newCateg = {
      name: req.body.name,
    };

    try {
      const tag = await Tag.findOne({
        where: {
          id: categId,
        },
      });
      await Tag.save({ ...Tag, ...newCateg });
      res.status(200).send({ message: 'Patch Tag OK' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: 'PATCH went wrong!' });
    }
  };
}
