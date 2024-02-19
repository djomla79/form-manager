import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Last name must be at least 2 characters!')
      .max(40, 'Last name must be less than 40 characters!')
      .regex(
        new RegExp('^[a-zA-Z0-9 ]+$'),
        'No special characters, except spaces, allowed!'
      )
      .refine(
        (data) => {
          return data.trim() === data;
        },
        {
          message: 'Can not have spaces at the beginning or at the end.',
        }
      ),
    email: z.string().email('Please enter a valid email address!'),
    password: z
      .string()
      .min(5, 'Password must be at least 5 characters!')
      .max(40, 'Password must be less than 40 characters!'),
    confirmPassword: z
      .string()
      .min(5, 'Password must be at least 5 characters!')
      .max(40, 'Password must be less than 40 characters!'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ['confirmPassword'],
  });

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, 'Last name must be at least 2 characters!')
    .max(40, 'Last name must be less than 40 characters!')
    .regex(
      new RegExp('^[a-zA-Z0-9 ]+$'),
      'No special characters, except spaces, allowed!'
    )
    .refine(
      (data) => {
        return data.trim() === data;
      },
      {
        message: 'Can not have spaces at the beginning or at the end.',
      }
    ),
  email: z.string().email('Please enter a valid email address!'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters!')
    .max(40, 'Password must be less than 40 characters!'),
});

export const LoginSchema = z.object({
  email: z.string().email('Please, enter a valid email address!'),
  password: z.string({
    required_error: 'Please, enter your password!',
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address!'),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(5, 'Password must be at least 5 characters!')
      .max(40, 'Password must be less than 40 characters!'),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password does not match!',
    path: ['confirmPassword'],
  });
