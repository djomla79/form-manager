'use client';

import CustomCard from '../shared/CustomCard';
import { UserDetailsType } from '@/lib/types/user-types';

type UserDetailsProps = UserDetailsType;

const UserDetails = ({ id, name, email }: UserDetailsProps) => {
  return <CustomCard name={name} email={email} />;
};

export default UserDetails;
