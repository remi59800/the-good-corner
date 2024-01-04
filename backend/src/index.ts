import 'reflect-metadata';
import { dataSource } from './datasource';
import { TagsResolver } from './resolvers/Tags';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AdsResolver } from './resolvers/Ads';
import { CategoriesResolver } from './resolvers/Categories';
import { UsersResolver } from './resolvers/Users';
import { customAuthChecker } from './auth';

async function start() {
  const schema = await buildSchema({
    resolvers: [TagsResolver, AdsResolver, CategoriesResolver, UsersResolver],
    authChecker: customAuthChecker,
  });

  const server = new ApolloServer({
    schema,
  });

  await dataSource.initialize();
  await startStandaloneServer(server, {
    listen: {
      port: 3001,
    },
    context: async (args) => {
      return {
        req: args.req,
        res: args.res,
      };
    },
  });

  console.log('🚀 Server started!');
}

start();
