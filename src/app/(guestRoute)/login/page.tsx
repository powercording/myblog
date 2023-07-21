import LoginForm from '@/components/login/loginForm';
// import authService from '../../service/AuthService';
import { findUser, authRequest } from '@/service/authService';

export type LoginRequestResult = ReturnType<typeof findUser>;

// export default function Login() {
//   const getUserFromServer = async (formData: FormData): Promise<LoginRequestResult> => {
//     'use server';

//     const email = formData.get('email') as string;
//     const user = await authService.findUser(email);

//     if ('email' in user) {
//       authService.authRequest(user);
//     }

//     return user;
//   };
//   return <LoginForm getUserFromAction={getUserFromServer} />;
// }

export default function Login() {
  const getUserFromServer = async (formData: FormData): Promise<LoginRequestResult> => {
    'use server';

    const email = formData.get('email') as string;
    const user = await findUser(email);

    if ('email' in user) {
      authRequest(user);
    }

    return user;
  };
  return <LoginForm getUserFromAction={getUserFromServer} />;
}
