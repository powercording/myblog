import JoinForm from '@/components/join/joinForm';
import { join } from '@/service/authService';

export default function JoinPage() {
  const serverJoinAction = async (email: string) => {
    'use server';

    const user = await join(email);
    return user;
  };
  return <JoinForm joinAction={serverJoinAction} />;
}
