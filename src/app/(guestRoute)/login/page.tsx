import LoginForm from '@/components/login/loginForm';
import authService from '../../service/AuthService';

export type LoginRequestResult = ReturnType<typeof authService.findUser>;

export default function Login() {
  const getUserFromServer = async (formData: FormData): Promise<LoginRequestResult> => {
    'use server';

    const email = formData.get('email') as string;
    const user = await authService.findUser(email);

    if ('email' in user) {
      authService.authRequest(user);
    }

    return user;
  };
  return <LoginForm getUserFromAction={getUserFromServer} />;
}
