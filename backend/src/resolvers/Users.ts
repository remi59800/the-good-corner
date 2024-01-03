import { Arg, ID, Int, Mutation, Query, Resolver } from 'type-graphql';
import { validate } from 'class-validator';
import { User, UserCreateInput } from '../entities/User';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

@Resolver()
export class UsersResolver {
  @Query(() => [User])
  async allTags(): Promise<User[]> {
    const users = await User.find({});
    return users;
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => ID) id: number): Promise<User | null> {
    const user = await User.findOne({
      where: { id: id },
    });
    return user;
  }

  @Mutation(() => User)
  async signUp(
    @Arg('data', () => UserCreateInput) data: UserCreateInput
  ): Promise<User> {
    const errors = await validate(data);
    if (errors.length !== 0) {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }

    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error(`User already exist`);
    }

    const newUser = new User();
    const hashedPassword = await argon2.hash(data.password);
    Object.assign(newUser, {
      email: data.email,
      hashedPassword,
    });

    await newUser.save();
    return newUser;
  }

  @Mutation(() => User, { nullable: true })
  async signin(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User | null> {
    // const hashedPassword = await argon2.hash(password);

    const existingUser = await User.findOneBy({ email });
    if (existingUser) {
      if (await argon2.verify(existingUser.hashedPassword, password)) {
        // authentified

        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
            userId: existingUser.id,
          },
          '5e52b73c-765a-4684-b12f-91d6c107acbc'
        );

        console.log(token);

        return existingUser;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
