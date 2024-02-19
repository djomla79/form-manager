import { z } from 'zod';
import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../validations/user-validation';

export type CreateUserType = {
  name: string;
  email: string;
  password?: string;
};

export type UserDetailsType = {
  id: string;
  name: string;
  email: string;
};

export type RegisterInputType = z.infer<typeof RegisterSchema>;
export type LoginInputType = z.infer<typeof LoginSchema>;
export type ForgotPasswordInputType = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInputType = z.infer<typeof ResetPasswordSchema>;
