'use server';

import connectDB from '@/lib/mongo/connect-db';
import { getUserByEmail, registerUser } from '@/lib/actions/user-actions';
import { type NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  await connectDB();

  const user = await request.json();
  console.log('user in POST: ', user);
  const existingUser = await getUserByEmail(user.email);

  if (existingUser) {
    return NextResponse.json('User is already registered!', { status: 400 });
  }

  try {
    await registerUser(user);
    return NextResponse.json('User is successfully registered', {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
