import { DataSource } from 'typeorm';
import { Ad } from './Ad';
import { Category } from './Category';
import { Tag } from './Tag';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: '../thegoodcorner.sqlite',
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: true,
});
