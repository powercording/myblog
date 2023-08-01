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
import CommentFallback from '@/components/comment/commentFallback';
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

    if (!result.ok) {
      console.log(result.error);
    }
  };

  const commentDelete = async (commentId: number) => {
    'use server';
    const result = await deleteComment(commentId);

    if (result.status === 200) {
      console.log('delete success');
      revalidatePath(`/post/[${id}]`);
    }

    if (!result.ok) {
      console.log(result.error);
    }
  };

  return (
    <main className="min-h-screen">
      <Suspense fallback={<HeaderFallback />}>
        <PostHeader postId={+id} currentUser={currentUser!} />
      </Suspense>
      <div className="mx-auto grid w-full grid-cols-3 justify-items-center gap-3 pt-2 2xl:w-3/4">
        <Suspense fallback={<ContentFallback />}>
          <Content postId={+id} />
        </Suspense>
        <aside className="col-span-3 w-full border-t lg:col-span-1 lg:border-l lg:border-t-0">
          <Suspense fallback={<CommentFallback />}>
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
