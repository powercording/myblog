import ProfilImage from '@/components/article/profilImage';
import { authOptions } from '@/lib/nextAuth/options';
import { findUser } from '@/service/authService';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import FileInput from '@/components/input/FileInput';
import { database } from '@/database/databaseClient';
import { user } from '@/lib/UserSchema/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect('/');
  }
  const { data } = await findUser(session.user.email as string);

  const onUpdate = async (profilePath: string) => {
    'use server';

    const uploadResult = await database
      .update(user)
      .set({ avatar: profilePath })
      .where(eq(user.email, session!.user!.email as string));

    if (uploadResult.rowsAffected >= 1) {
      revalidatePath('/mypage');
    }
  };

  return (
    <main className="mx-auto mt-6 flex min-h-screen w-full flex-col items-center gap-3 p-2 pt-12 xl:w-4/6">
      <h1>{data.name} myPage</h1>
      <form>
        <div className="grid grid-cols-3">
          <ProfilImage authorProfilImg={data.avatar} className="h28 col-span-1 w-28" />
          <div className="col-span-2 flex flex-col">
            <FileInput onUpdate={onUpdate} />
          </div>
        </div>
      </form>
    </main>
  );
}
