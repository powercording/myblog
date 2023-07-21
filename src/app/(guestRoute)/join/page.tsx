import JoinForm from '@/components/join/joinForm';
// import authService from '../../service/AuthService';
import { join } from '@/service/authService';

// export default function JoinPage() {
//   const serverJoinAction = async (email: string) => {
//     'use server';

//     const user = await authService.join(email);
//     return user;
//   };
//   return <JoinForm joinAction={serverJoinAction} />;
// }
export default function JoinPage() {
  const serverJoinAction = async (email: string) => {
    'use server';

    const user = await join(email);
    return user;
  };
  return <JoinForm joinAction={serverJoinAction} />;
}
