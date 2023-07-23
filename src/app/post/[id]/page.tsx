import { Suspense } from 'react';

import { database } from '@/database/databaseClient';
import { insertComment, deleteComment } from '@/service/commentService';
import { post } from '@/lib/PostSchema/schema';
import { authOptions } from '@/lib/nextAuth/options';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { revalidatePath } from 'next/cache';

import CommentArea from '@/components/comment/commentArea';
import PostHeader from '@/components/article/post/Header';
import Content from '@/components/article/post/content';
import ContentFallback from '@/components/article/post/contentFallback';
import HeaderFallback from '@/components/article/post/headerFallback';
export type Params = {
  params: {
    id: string;
  };
};

export default async function Post({ params: { id } }: Params) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.name;

  const markdownPost = await database.query.post.findFirst({
    where: eq(post.id, Number(id)),
    columns: { content: true },
  });

  if (!markdownPost) {
    redirect('/');
  }

  const commentAction = async (comment: FormData) => {
    'use server';
    const content = comment.get('comment') as string;
    const result = await insertComment(content, Number(id));

    if (result.status === 200) {
      revalidatePath(`/post/[${id}]`);
    }
  };

  const commentDelete = async (commentId: number) => {
    'use server';
    const result = await deleteComment(commentId);

    if (result.status === 200) {
      console.log('delete success');
      revalidatePath(`/post/[${id}]`);
    }
  };

  return (
    <main className="min-h-screen">
      <Suspense fallback={<HeaderFallback />}>
        <PostHeader postId={+id} currentUser={currentUser!} />
      </Suspense>
      <div className="grid grid-cols-3 w-full 2xl:w-3/4 justify-items-center mx-auto pt-2 gap-3">
        <Suspense fallback={<ContentFallback />}>
          <Content postId={+id} />
        </Suspense>
        <aside className="lg:border-l border-t lg:border-t-0 w-full col-span-3 lg:col-span-1">
          <Suspense fallback={<div>reply loading...</div>}>
            <CommentArea
              postId={+id}
              currentUser={currentUser!}
              onDelete={commentDelete}
              onSubmit={commentAction}
            />
          </Suspense>
        </aside>
      </div>
    </main>
  );
}
