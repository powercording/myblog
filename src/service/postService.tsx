'use server';

//TODO: 파일 전체에 콘솔로그 리턴값을 데이터로 교체 해야함
import { InferModel, eq, and, ConsoleLogWriter } from 'drizzle-orm';
import { post } from '@/lib/PostSchema/schema';
import { withTryCatchSession } from './withService';
import { Session } from 'next-auth';
import { database } from '@/database/databaseClient';
import ResponseBuilder from './ResponseBuilder';

const host = process.env.NEXT_PUBLIC_URL;
export type UpdateMarkdown = InferModel<typeof post>;
export type Markdown = Omit<UpdateMarkdown, 'id' | 'createdAt' | 'userName'>;

const insertPost = withTryCatchSession(async (markdownModel: Markdown, session?: Session) => {
  if (!session || !session.user) {
    return new ResponseBuilder()
      .setError({ message: '먼저 로그인 해야 합니다.' })
      .setOk(false)
      .setStatus(401)
      .build();
  }

  const insertResult = await database.insert(post).values({
    ...markdownModel,
    userName: session.user.name as string,
  });

  if (insertResult.rowsAffected === 0 || insertResult.rowsAffected === undefined) {
    return new ResponseBuilder()
      .setError({ message: '포스트 등록에 실패했습니다.' })
      .setOk(false)
      .setStatus(500)
      .build();
  }

  return new ResponseBuilder().setOk(true).setStatus(200).setData(insertResult.insertId).build();
});

const deletePost = withTryCatchSession(async (id: number, session?: Session) => {
  if (!session || !session.user) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(401)
      .setError({ message: '먼저 로그인 해야 합니다.' })
      .build();
  }

  const deleted = await database
    .delete(post)
    .where(and(eq(post.id, id), eq(post.userName, session.user.name as string)));

  if (deleted.rowsAffected === 0 || deleted.rowsAffected === undefined) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setError({ message: '삭제에 실패했습니다.' })
      .build();
  }

  return new ResponseBuilder().setOk(true).setStatus(200).build();
});

const updatePost = withTryCatchSession(async (markdownModel: UpdateMarkdown, session?: Session) => {
  if (!session || !session.user) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(401)
      .setError({ message: '먼저 로그인 해야 합니다.' })
      .build();
  }

  if (markdownModel.id === undefined) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(404)
      .setError({ message: '정보를 확인할 수 없습니다.' })
      .build();
  }

  if (markdownModel.userName !== session.user.name) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(403)
      .setError({ message: '권한이 없습니다.' })
      .build();
  }
  const { content, title, categories } = markdownModel;

  const updated = await database
    .update(post)
    .set({ content, title, categories })
    .where(eq(post.id, markdownModel.id));

  if (updated.rowsAffected === 0 || updated.rowsAffected === undefined) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setError({ message: '수정에 실패했습니다' })
      .build();
  }

  return new ResponseBuilder().setOk(true).setStatus(200).setData(markdownModel.id).build();
});

export { insertPost, deletePost, updatePost };
