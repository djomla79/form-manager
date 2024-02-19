'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { LoginSchema } from '@/lib/validations/user-validation';
import { LoginInputType } from '@/lib/types/user-types';
import { BASE_URL } from '@/lib/constants/global';

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputType>({
    resolver: zodResolver(LoginSchema),
  });

  const togglePassword = () => setIsVisible((prev) => !prev);

  const onSubmit: SubmitHandler<LoginInputType> = async ({
    email,
    password,
  }) => {
    await signIn('credentials', {
      email,
      password,
      callbackUrl: `${BASE_URL}/profile`,
    });
    toast.success('Login succeded.');
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 border rounded-md shadow overflow-hidden min-w-[600px]'
      >
        <div className='p-2 flex flex-col gap-2'>
          <Input
            label='Email'
            {...register('email')}
            errorMessage={errors.email?.message}
          />
          <Input
            label='Password'
            {...register('password')}
            type={isVisible ? 'text' : 'password'}
            errorMessage={errors.password?.message}
            endContent={
              <button type='button' onClick={togglePassword}>
                {isVisible ? (
                  <EyeSlashIcon className='w-6' />
                ) : (
                  <EyeIcon className='w-6' />
                )}
              </button>
            }
          />
          <div
            className='flex items-center justify-center gap-2'
            suppressHydrationWarning
          >
            <Button
              color='primary'
              type='submit'
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
