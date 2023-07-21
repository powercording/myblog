import { database } from '@/database/databaseClient';
import { Params } from '@/app/post/[id]/page';
import { post } from '@/lib/PostSchema/schema';
import { eq } from 'drizzle-orm';
import MarkdownSet from '@/components/markdown/markdownSet';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth/options';
import { redirect } from 'next/navigation';

export default async function PostEdit({ params: { id } }: Params) {
  const session = await getServerSession(authOptions);
  const markdown = await database
    .select()
    .from(post)
    .where(eq(post.id, Number(id)));

  if (session?.user?.name !== markdown[0].userName) {
    redirect('/');
  }

  return <MarkdownSet markdown={markdown[0]} renderType="edit" />;
}
