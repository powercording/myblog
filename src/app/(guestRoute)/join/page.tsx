import JoinForm from '@/components/join/joinForm';
import authService from '../../service/AuthService';

export default function JoinPage() {
  const serverJoinAction = async (email: string) => {
    'use server';

    const user = await authService.join(email);
    return user;
  };
  return <JoinForm joinAction={serverJoinAction} />;
}
