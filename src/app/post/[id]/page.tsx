import { Suspense } from 'react';
import { database } from '@/database/databaseClient';
import { post } from '@/lib/PostSchema/schema';
import { authOptions } from '@/lib/nextAuth/options';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import CommentArea from '@/components/comment/commentArea';
import PostHeader from '@/components/article/post/Header';
import ContentFallback from '@/components/article/post/contentFallback';
import HeaderFallback from '@/components/article/post/headerFallback';
import CommentFallback from '@/components/comment/commentFallback';
import Preview from '@/components/markdown/Preview';

export type Params = {
  params: {
    id: string;
  };
};

export default async function Post({ params: { id } }: Params) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.name;

  const markdown = await database.query.post.findFirst({
    where: eq(post.id, +id),
    columns: { content: true },
  });

  return (
    <main className="min-h-screen pb-10">
      <Suspense fallback={<HeaderFallback />}>
        <PostHeader postId={+id} currentUser={currentUser!} />
      </Suspense>
      <Suspense fallback={<ContentFallback />}>
        <article className="mx-auto flex w-full px-4 pt-2 sm:w-3/4 2xl:w-3/4">
          {!markdown.content ? (
            <div>페이지 조회에 실패하였습니다.</div>
          ) : (
            <Preview doc={markdown.content} />
          )}
        </article>
      </Suspense>
      <section className="mx-auto mt-4 w-full border-t border-t-[#abb2bf] pt-4 sm:w-3/4">
        <Suspense fallback={<CommentFallback />}>
          <CommentArea postId={+id} currentUser={currentUser!} />
        </Suspense>
      </section>
    </main>
  );
}
