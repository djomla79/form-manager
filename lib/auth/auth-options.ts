import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongo/connect-db';
import { getUserByEmail } from '@/lib/actions/user-actions';
import { comparePassword } from '@/lib/utils/server-helper-functions';

const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        connectDB();
        const emailCredentials = credentials?.email;
        const passwordCredentials = credentials?.password;

        if (!emailCredentials)
          throw new Error('Please, provide correct email.');

        if (!passwordCredentials)
          throw new Error('Please, provide correct password.');

        const user = await getUserByEmail(emailCredentials!);

        if (!user) throw new Error('User with provided email not found!');

        const isPasswordMatched = await comparePassword(
          passwordCredentials,
          user.password
        );

        if (!isPasswordMatched) throw new Error('Password does not match!');

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        email: token.email,
      };
      return session;
    },
  },
};

export { authOptions };
