'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/lib/validations/user-validation';
import { RegisterInputType } from '@/lib/types/user-types';
import { BASE_URL } from '@/lib/constants/global';
import RegisterForm from './RegisterForm';

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterInputType>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onBlur',
  });

  const togglePassword = () => setIsVisible((prev) => !prev);

  const saveUser: SubmitHandler<RegisterInputType> = async (data) => {
    const { confirmPassword, ...user } = data;
    const { email, password } = user;

    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      setIsLoading(false);

      await signIn('credentials', {
        email,
        password,
        callbackUrl: `${BASE_URL}/profile`,
      });
      toast.success('User successfully registered.');
      reset();
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <RegisterForm
      data={{
        handleSubmit,
        saveUser,
        register,
        errors,
        control,
        togglePassword,
        isVisible,
        watch,
        isLoading,
      }}
    />
  );
};

export default Register;
