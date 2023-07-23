'use server';

//TODO: 파일 전체에 콘솔로그 리턴값을 데이터로 교체 해야함
import { InferModel, eq, and, ConsoleLogWriter } from 'drizzle-orm';
import { post } from '@/lib/PostSchema/schema';
import { withTryCatchSession } from './withService';
import { Session } from 'next-auth';
import { database } from '@/database/databaseClient';

const host = process.env.NEXT_PUBLIC_URL;
export type UpdateMarkdown = InferModel<typeof post>;
export type Markdown = Omit<UpdateMarkdown, 'id' | 'createdAt' | 'userName'>;

const insertPost = withTryCatchSession(async (markdownModel: Markdown, session?: Session) => {
  if (!session || !session.user) {
    return console.log('올바른 유저의 접근이 아닙니다. 유저를 확인할 수 없습니다.');
  }

  const insertResult = await database.insert(post).values({
    ...markdownModel,
    userName: session.user.name as string,
  });

  if (insertResult.rowsAffected === 0 || insertResult.rowsAffected === undefined) {
    return console.log('등록에 실패했습니다.');
  }

  return { postId: insertResult.insertId };
});

const deletePost = withTryCatchSession(async (id: number, session?: Session) => {
  if (!session || !session.user) {
    return console.log('올바른 유저의 접근이 아닙니다. 유저를 확인할 수 없습니다.');
  }

  const deleted = await database
    .delete(post)
    .where(and(eq(post.id, id), eq(post.userName, session.user.name as string)));

  console.log(deleted);

  if (deleted.rowsAffected === 0 || deleted.rowsAffected === undefined) {
    return { deleted: false };
  }

  return { deleted: true };
});

const updatePost = withTryCatchSession(async (markdownModel: UpdateMarkdown, session?: Session) => {
  if (!session || !session.user) {
    return console.log('올바른 유저의 접근이 아닙니다. 유저를 확인할 수 없습니다.');
  }

  if (markdownModel.id === undefined) {
    return console.log('수정 요청을 처리하지 못했습니다.');
  }

  if (markdownModel.userName !== session.user.name) {
    return console.log('올바른 수정요청이 아닙니다.');
  }
  const { content, title, categories } = markdownModel;

  const updated = await database
    .update(post)
    .set({ content, title, categories })
    .where(eq(post.id, markdownModel.id));

  if (updated.rowsAffected === 0 || updated.rowsAffected === undefined) {
    return console.log('수정에 실패했습니다.');
  }

  return console.log('잘 수정됬다고 생각합니다.');
});

export { insertPost, deletePost, updatePost };
