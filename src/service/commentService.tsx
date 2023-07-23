'use server';

import { withTryCatchSession } from './withService';
import { Session } from 'next-auth';
import ResponseBuilder from './ResponseBuilder';
import { database } from '@/database/databaseClient';
import { comment } from '@/lib/CommentSchema/schema';
import { and, eq } from 'drizzle-orm';

const insertComment = withTryCatchSession(
  async (content: string, postId: number, session?: Session) => {
    if (content.trim() === '') {
      return new ResponseBuilder()
        .setStatus(400)
        .setOk(false)
        .setError({ message: '댓글을 입력해주세요.' })
        .build();
    }
    if (!session || !session.user) {
      return new ResponseBuilder()
        .setStatus(401)
        .setOk(false)
        .setError({ message: '로그인이 필요합니다.' })
        .build();
    }

    const insertedCommnet = await database
      .insert(comment)
      .values({ userName: session.user.name as string, content, postId });

    if (insertedCommnet.rowsAffected === 0 || insertedCommnet.rowsAffected === undefined) {
      return new ResponseBuilder()
        .setStatus(500)
        .setOk(false)
        .setError({ message: '댓글 등록에 실패했습니다.' })
        .build();
    }

    return new ResponseBuilder().build();
  },
);

const deleteComment = withTryCatchSession(async (deleteId: number, session?: Session) => {
  if (!session || !session.user) {
    return new ResponseBuilder()
      .setStatus(401)
      .setOk(false)
      .setError({ message: '로그인이 필요합니다.' })
      .build();
  }

  const deletedComment = await database
    .delete(comment)
    .where(and(eq(comment.id, deleteId), eq(comment.userName, session.user.name as string)));

  if (deletedComment.rowsAffected === 0 || deletedComment.rowsAffected === undefined) {
    return new ResponseBuilder()
      .setStatus(500)
      .setOk(false)
      .setError({ message: '댓글 삭제에 실패했습니다.' })
      .build();
  }

  return new ResponseBuilder().build();
});

const updateComment = withTryCatchSession(
  async (comment: string, id: number, session?: Session) => {},
);

const getComment = withTryCatchSession(async (postId: number, session?: Session) => {});

export { insertComment, deleteComment, updateComment, getComment };
