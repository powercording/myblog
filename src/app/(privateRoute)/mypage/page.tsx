import { authOptions } from '@/lib/nextAuth/options';
import { findUser } from '@/service/authService';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect('/');
  }
  const user = await findUser(session.user.email as string);

  return (
    <main className="flex flex-col min-h-screen justify-center items-center  w-full xl:w-4/6 mx-auto">
      mypage comming soon...
    </main>
  );
}
