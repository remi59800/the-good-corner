import { Controller } from '.';
import { Request, Response } from 'express';
import { Category } from '../entities/Category';

export class CategoriesController extends Controller {
  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      res.send(categories);
    } catch (error) {
      res.status(500).json({ success: false, message: 'GET went wrong!' });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const category = await Category.findOne({
        where: { id: Number(req.params.id) },
      });
      res.send(category);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'GET Category id went wrong!' });
    }
  };

  getAllWithFilter = async (req: Request, res: Response) => {
    try {
      const categoryId = Number(req.params.id);

      const category = await Category.findOne({
        where: { id: categoryId },
        relations: ['ads'],
      });
      if (category) {
        res.send(category.ads);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'GET went wrong!' });
    }
  };

  createOne = async (req: Request, res: Response) => {
    try {
      const newCateg = new Category();
      newCateg.name = req.body.name;
      newCateg.save();
      res.send(newCateg);
    } catch (error) {
      res.status(500).json({ success: false, message: 'POST went wrong!' });
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      const category = await Category.findOne({
        where: { id: Number(req.params.id) },
      });
      if (category) {
        await category.remove();
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
      const category = await Category.findOne({
        where: {
          id: categId,
        },
      });
      await Category.save({ ...category, ...newCateg });
      res.status(200).send({ message: 'Patch Category OK' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: 'PATCH went wrong!' });
    }
  };
}
