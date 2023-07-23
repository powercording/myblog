import MarkdownViewer from '@/components/markdown/markdownViewer';
import { database } from '@/database/databaseClient';
import { post } from '@/lib/PostSchema/schema';
import { eq } from 'drizzle-orm';

interface Content {
  postId: number;
}

export default async function Content({ postId }: Content) {
  const markdown = await database.query.post.findFirst({
    where: eq(post.id, postId),
    columns: { content: true },
  });

  if (!markdown) {
    return <div>페이지 조회에 실패하였습니다.</div>;
  }

  return (
    <article className="col-span-3 lg:col-span-2 w-full">
      <MarkdownViewer markdown={markdown.content} />
    </article>
  );
}
