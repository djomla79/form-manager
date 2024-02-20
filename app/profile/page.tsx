import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { getUserByEmail } from '@/lib/actions/user-actions';
import UserDetails from '@/components/user/UserDetails';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email ? session.user.email : '';
  const user = await getUserByEmail(sessionEmail);

  if (!user) throw new Error('User is not found!');

  return (
    <div className='flex justify-center items-center flex-col'>
      <UserDetails {...user} />
    </div>
  );
};

export default ProfilePage;
