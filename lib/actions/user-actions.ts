'use server';

import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import User from '../mongo/user-model';
import { UserSchema } from '../validations/user-validation';
import { CreateUserType } from '../types/user-types';

export const registerUser = async (user: CreateUserType) => {
  const { name, email, password } = user;
  const validateUser = UserSchema.safeParse(user);

  if (!validateUser.success)
    throw new Error('Validation failed, user is not saved!');

  const bcryptPassword = await bcrypt.hash(password!, 10);

  const newUser = {
    name,
    email,
    password: bcryptPassword,
  };
  console.log('newUser in registerUser: ', newUser);

  await User.create(newUser);
  revalidatePath('/profile');
  return { email, password };
};

export const getUserByEmail = async (email: string) => {
  const encodedEmail = decodeURIComponent(email);
  const userFoundByEmail = await User.findOne({ email: encodedEmail }).exec();
  let user = null;

  if (userFoundByEmail) {
    const {
      _id,
      _doc: { _id: id, ...rest },
    } = userFoundByEmail;
    user = {
      id,
      ...rest,
    };
  }
  revalidatePath('/profile');
  return user;
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);

  if (!user) throw new Error('User is not found!');

  revalidatePath(`/profile/${id}`);
  return user;
};

export const updatePasswordById = async (id: string, password: string) => {
  return await User.findByIdAndUpdate(id, {
    password: await bcrypt.hash(password, 10),
  });
};
