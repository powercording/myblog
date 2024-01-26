import { database } from '@/database/databaseClient';
import { Params } from '@/app/post/[id]/page';
import { post } from '@/lib/PostSchema/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth/options';
import { redirect } from 'next/navigation';
import PostUpdater from './components/PostUpdater';

export default async function PostEdit({ params: { id } }: Params) {
  const session = await getServerSession(authOptions);

  const markdown = await database.query.post.findFirst({
  where: eq(post.id, +id),
  });

  if (session?.user?.name !== markdown.userName) {
    redirect('/');
  }

  return <PostUpdater  post={markdown}/>;
}
