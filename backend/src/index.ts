import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { dataSource } from './entities/datasource';
import { AdsController } from './controllers/Ads';
import { CategoriesController } from './controllers/Categories';
import { TagsController } from './controllers/Tags';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// ADS

const adsController = new AdsController();
app.get('/ads', adsController.getAll);
app.get('/ads/:id', adsController.getOne);
app.post('/ads', adsController.createOne);
app.put('/ads/:id', adsController.updateOne);
app.patch('/ads/:id', adsController.patchOne);
app.delete('/ads/:id', adsController.deleteOne);

// CATEGORIES
const categoriesController = new CategoriesController();
app.get('/categories', categoriesController.getAll);
app.get('/categories/:id', categoriesController.getOne);
app.get('/categories/:id/ads', categoriesController.getAllWithFilter);
app.post('/categories', categoriesController.createOne);
app.put('/categories/:id', categoriesController.updateOne);
app.patch('/categories/:id', categoriesController.patchOne);
app.delete('/categories/:id', categoriesController.deleteOne);

// TAGS
const tags = new TagsController();
app.get('/tags', tags.getAll);
app.get('/tags/:id', tags.getOne);
app.post('/tags', tags.createOne);
app.put('/tags/:id', tags.updateOne);
app.patch('/tags/:id', tags.patchOne);
app.delete('/tags/:id', tags.deleteOne);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server ready on ${port} 🚀`);
});
