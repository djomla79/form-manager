import { Button, Input } from '@nextui-org/react';
import {
  UseFormHandleSubmit,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
  Control,
} from 'react-hook-form';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import PasswordStrength from './PasswordStrength';
import { RegisterInputType } from '@/lib/types/user-types';

type RegisterFormProps = {
  data: {
    handleSubmit: UseFormHandleSubmit<RegisterInputType>;
    saveUser: SubmitHandler<RegisterInputType>;
    register: UseFormRegister<RegisterInputType>;
    errors: FieldErrors<RegisterInputType>;
    control: Control<RegisterInputType>;
    togglePassword: () => void;
    isVisible: boolean;
    watch: () => void;
    isLoading: boolean;
  };
};

const RegisterForm = ({ data }: RegisterFormProps) => {
  const {
    handleSubmit,
    saveUser,
    register,
    errors,
    togglePassword,
    isVisible,
    watch,
    isLoading,
  } = data;
  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className='p-2 gap-2 shadow border rounded-md min-w-[600px]'
    >
      <Input
        className='p-1'
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        {...register('name')}
        label='Name'
        startContent={<UserIcon className='w-6' />}
      />
      <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register('email')}
        className='col-span-2 p-1'
        label='Email'
        startContent={<EnvelopeIcon className='w-6' />}
      />
      <Input
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register('password')}
        className='col-span-2 p-1'
        label='Password'
        type={isVisible ? 'text' : 'password'}
        startContent={<KeyIcon className='w-6' />}
        endContent={
          isVisible ? (
            <EyeSlashIcon
              className='w-6 cursor-pointer'
              onClick={togglePassword}
            />
          ) : (
            <EyeIcon className='w-6 cursor-pointer' onClick={togglePassword} />
          )
        }
      />
      <PasswordStrength watch={watch} />
      <Input
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register('confirmPassword')}
        className='col-span-2 p-1'
        label='Confirm Password'
        type={isVisible ? 'text' : 'password'}
        startContent={<KeyIcon className='w-6' />}
      />
      <div className='flex justify-center col-span-2'>
        <Button className='w-48' color='primary' type='submit'>
          {`${isLoading ? 'Loading' : 'Submit'}`}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
