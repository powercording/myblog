import LoginForm from '@/components/login/loginForm';
import { findUser, authRequest } from '@/service/authService';

export type LoginRequestResult = ReturnType<typeof findUser>;

export default async function Login() {
  const getUserFromServer = async (formData: FormData): Promise<LoginRequestResult> => {
    'use server';

    const email = formData.get('email') as string;
    const user = await findUser(email);

    if ('email' in user) {
      const authResult = await authRequest(user);
      if ('error' in authResult) {
        return authResult;
      }
    }

    return user;
  };
  return <LoginForm getUserFromAction={getUserFromServer} />;
}
