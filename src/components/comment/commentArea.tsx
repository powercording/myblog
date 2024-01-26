import { database } from '@/database/databaseClient';
import Comment from './comment';
import { eq } from 'drizzle-orm';
import { comment } from '@/lib/CommentSchema/schema';
import { TiDelete } from 'react-icons/ti';
import DeleteIconButton from '../button/deleteIconButton';
import CommentBox from './commentBox';
import { LiaCommentDotsSolid } from 'react-icons/lia';
import { insertComment } from '@/service/commentService';
import { deleteComment } from '@/service/commentService';
import { revalidatePath } from 'next/cache';

interface CommentBox {
  postId: number;
  currentUser: string;
}

export default async function CommentArea({ postId, currentUser }: CommentBox) {
  const comments = await database.query.comment.findMany({
    where: eq(comment.postId, postId),
    with: {
      commentBy: {
        columns: {
          avatar: true,
        },
      },
    },
  });

  return (
    <div className="sticky top-20 w-full p-5">
      <div className="grid w-full gap-3">
        {comments?.map(comment => (
          <Comment key={comment.id} comment={comment}>
            {currentUser === comment.userName && (
              <DeleteIconButton
                deleteApi={async () => {
                  'use server';
                  const result = await deleteComment(comment.id);
                  if (result.status === 200) {
                    revalidatePath(`/post/[${postId}]`);
                  }
                  if (!result.ok) {
                    console.log(result.error);
                  }
                }}
                className="absolute right-3 top-2"
                deleteId={comment.id}
                icon={<TiDelete />}
              />
            )}
          </Comment>
        ))}
      </div>
      <form
        action={async (formData: FormData) => {
          'use server';
          const result = await insertComment(formData.get('comment') as string, postId);
          if (result.status === 200) {
            revalidatePath(`/post/[${postId}]`);
          }
          if (!result.ok) {
            console.log(result.error);
          }
        }}
        className="relative flex flex-col py-5"
      >
        <span className="text-sm text-gray-400"> Write your comment </span>
        <CommentBox currentUser={currentUser} />
        <button type="submit" className="flex w-full justify-center rounded-md bg-slate-800 p-2">
          <LiaCommentDotsSolid className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
}
