import MarkdownViewer from '@/components/markdown/markdownViewer';
import Link from 'next/link';
import { FiTool } from 'react-icons/fi';
import { LiaCommentDotsSolid } from 'react-icons/lia';

import { database } from '@/database/databaseClient';
import { post } from '@/lib/PostSchema/schema';
import { authOptions } from '@/lib/nextAuth/options';
import { getServerSession } from 'next-auth';

import { dateFormatter } from '@/lib/util/dateTimeFormatter';
import { eq } from 'drizzle-orm';
import CommentBox from '@/components/commentBox/commentBox';
import commentService from '@/app/service/CommentService';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Comment from '@/components/commentBox/comment';

export type Params = {
  params: {
    id: string;
  };
};

export default async function Post({ params: { id } }: Params) {
  const session = await getServerSession(authOptions);

  const markdownPost = await database.query.post.findFirst({
    where: eq(post.id, Number(id)),
    with: {
      comments: {
        with: {
          commentBy: {
            columns: {
              avatar: true,
            },
          },
        },
      },
    },
  });

  if (!markdownPost) {
    redirect('/');
  }
  const { comments } = markdownPost;

  const isOwner = session?.user?.name === markdownPost.userName;

  const commentAction = async (comment: FormData) => {
    'use server';
    const content = comment.get('comment') as string;
    const result = await commentService.insertComment(content, Number(id));

    if (result?.status === 200) {
      revalidatePath(`/post`);
    }
  };

  const title = markdownPost.title;
  const userName = markdownPost.userName;
  const createdAt = markdownPost.createdAt;
  const content = markdownPost.content;

  return (
    <main className="min-h-screen">
      <header className="mt-12 min-h-fit  bg-slate-800 relative">
        <h1 className="block w-full 2xl:w-3/4 mx-auto p-5 text-2xl font-bold text-blue-500">
          {title}
        </h1>
        <address className="block w-full 2xl:w-3/4 mx-auto p-5 text-gray-400">
          <p>{userName}</p>
          <div className="flex">
            <time>{dateFormatter(createdAt)}</time>
            {isOwner && (
              <Link href={`edit/${id}`} className="absolute right-5 top-5">
                <button className="p-2 rounded-md hover:bg-blue-100 bg-white text-blue-700 w-fit h-9">
                  <FiTool />
                </button>
              </Link>
            )}
          </div>
        </address>
      </header>
      <div className="grid grid-cols-3 w-full 2xl:w-3/4 justify-items-center mx-auto pt-2 gap-3">
        <article className="col-span-3 lg:col-span-2 w-full">
          <MarkdownViewer markdown={content} />
        </article>

        <aside className="lg:border-l border-t lg:border-t-0 w-full col-span-3 lg:col-span-1">
          <div className="w-full rounded-sm p-5 sticky top-20">
            <div className="w-full grid gap-3">
              {comments?.map(comment => <Comment key={comment.id} comment={comment} />)}
            </div>

            <form action={commentAction} className="flex flex-col relative">
              <span className="text-gray-400 text-sm"> Write your comment </span>
              <CommentBox />
              <button
                type="submit"
                className="w-full bg-slate-800 p-2 rounded-md flex justify-center"
              >
                <LiaCommentDotsSolid className="w-6 h-6" />
              </button>
            </form>
          </div>
        </aside>
      </div>
    </main>
  );
}
