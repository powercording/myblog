import LoginForm from '@/components/auth/login/loginForm';
import { findUser, authRequest } from '@/service/authService';

export type LoginRequestResult = ReturnType<typeof findUser>;

export default async function Login() {
  const getUserFromServer = async (formData: FormData): Promise<LoginRequestResult> => {
    'use server';

    const email = formData.get('email') as string;
    const user = await findUser(email);

    if (user.ok && user.data) {
      const authResult = await authRequest(user.data);
      if (!authResult.ok) {
        return authResult;
      }
    }
    return user;
  };
  return <LoginForm getUser={getUserFromServer} />;
}
