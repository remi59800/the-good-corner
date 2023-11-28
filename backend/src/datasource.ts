import { DataSource } from 'typeorm';
import { Ad } from './entities/Ad';
import { Category } from './entities/Category';
import { Tag } from './entities/Tag';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: '../thegoodcorner.sqlite',
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: true,
});
