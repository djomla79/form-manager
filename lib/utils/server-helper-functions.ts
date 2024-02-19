'use server';

import bcrypt from 'bcrypt';

export const comparePassword = async (
  credentialsPassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(credentialsPassword, userPassword);
};
