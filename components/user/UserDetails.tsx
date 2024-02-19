'use client';

import CustomCard from '../shared/CustomCard';
import { UserDetailsType } from '@/lib/types/user-types';

type UserDetailsProps = UserDetailsType;

const UserDetails = ({ id, name, email, username }: UserDetailsProps) => {
  return <CustomCard name={name} email={email} username={username} />;
};

export default UserDetails;
