'use client';

import { useState, useEffect } from 'react';
import { passwordStrength } from 'check-password-strength';

const PasswordStrength = ({ watch }: any) => {
  const [strength, setStrength] = useState(0);
  const watchPassword = watch().password;

  useEffect(() => {
    setStrength(passwordStrength(watchPassword).id);
  }, [watchPassword]);

  let strengthColor = '';

  if (strength === 0) {
    strengthColor = 'bg-red-500';
  } else if (strength === 1) {
    strengthColor = 'bg-orange-500';
  } else if (strength === 2) {
    strengthColor = 'bg-yellow-500';
  } else if (strength === 3) {
    strengthColor = 'bg-green-500';
  } else {
    strengthColor = 'bg-red-500';
  }

  return (
    <div className='col-span-2 flex gap-2'>
      {Array.from({ length: strength + 1 }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-32 rounded-md ${strengthColor}`}
        ></div>
      ))}
    </div>
  );
};

export default PasswordStrength;
