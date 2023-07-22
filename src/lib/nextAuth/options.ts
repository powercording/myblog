import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { User } from 'next-auth/src';
import { CredentialsConfig, CredentialInput } from 'next-auth/providers/credentials';
import { database } from '@/database/databaseClient';
import { user } from '../UserSchema/schema';
import { eq } from 'drizzle-orm';
import { token } from '../TokenSchema/schema';

type MyUser = {} & User;

const emailCredential: CredentialInput = {
  label: 'Email',
  type: 'email',
  placeholder: 'email',
};
const passwordCredential: CredentialInput = {
  label: 'Password',
  type: 'password',
  placeholder: 'Password',
};

const authorize: CredentialsConfig['authorize'] = async credentials => {
  if (!credentials) {
    return Promise.resolve(null);
  }

  const { email, password } = credentials;

  const users = await database.select().from(user).where(eq(user.email, email));
  const tokens = await database.select().from(token).where(eq(token.payload, password));

  if (!users[0] || !tokens[0]) {
    console.log('no user or no token');
    return null;
  }
  if (users[0].id !== tokens[0].userId) {
    console.log('user id and token userId is not same');
    return null;
  }

  await database.delete(token).where(eq(token.userId, users[0].id));

  const loginUser: MyUser = {
    id: `${users[0].id}`,
    email,
    name: `${users[0].name}`,
  };

  return loginUser;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: emailCredential,
        password: passwordCredential,
      },
      authorize,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
