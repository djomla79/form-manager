import Link from 'next/link';
import { Button } from '@nextui-org/react';
import Register from '@/components/auth/Register';

const RegisterPage = () => {
  return (
    <div className='flex items-center justify-center flex-col'>
      <Register />
      <Button className='mt-2' as={Link} href='/auth/login'>
        Already have an account? Login
      </Button>
    </div>
  );
};

export default RegisterPage;
