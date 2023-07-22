'use server';

import { InferModel } from 'drizzle-orm';
import { post } from '@/lib/PostSchema/schema';
import { redirect } from 'next/navigation';

const host = process.env.NEXT_PUBLIC_URL;
type Markdown = Partial<InferModel<typeof post>>;

//TODO: 해당 파일의 모든 함수가 세션유효성 검사를 필요로 하므로, 트라이캐치와 세션검사를 포함하는 래퍼함수를 작성할것.

const insertPost = async (markdownModel: Markdown) => {
  // TODO: 인서트 로직에 세션검사 추가.
  const result = await fetch(`${host}/api/post`, {
    method: 'POST',
    body: JSON.stringify(markdownModel),
  });
  if (result.status === 200) {
    return console.log('잘 등록됬다고 생각합니다.');
  }
};

const deletePost = async (id: number) => {
  // TODO: delete 로직에 세션검사 추가.
  const deleteResult = await fetch(`${host}/api/post/${id}`, {
    method: 'DELETE',
  });
  if (deleteResult.status === 200) {
    return (window.location.href = '/');
  }
};

const updatePost = async (markdownModel: Markdown) => {
  // TODO: update 로직에 세션검사 추가.
  const result = await fetch(`${host}/api/post`, {
    method: 'PATCH',
    body: JSON.stringify(markdownModel),
  });
  if (result.status === 200) {
    return (window.location.href = result.url);
  }
};

export { insertPost, deletePost, updatePost };
