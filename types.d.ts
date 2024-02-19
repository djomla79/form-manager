import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
      email: string;
      username: string;
    };
  }
  interface User {
    role: string;
    email: string;
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    email: string;
    username: string;
  }
}
