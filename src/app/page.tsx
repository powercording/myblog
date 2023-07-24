import Article from '@/components/article/card/article';
import { database } from '@/database/databaseClient';
import Link from 'next/link';

export default async function Home() {
  const getPosts = await database.query.post.findMany({
    with: {
      createdBy: {
        columns: { avatar: true },
      },
    },
  });
  const posts = getPosts.reverse();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-9 px-3 md:p-12  mx-auto">
      <div className="py-12 min-h-screen h-auto grid grid-cols-5 w-full xl:w-4/6 mx-auto gap-3">
        <aside className="hidden md:block md:col-span-1">
          <div className="sticky top-12 p-3"></div>
        </aside>
        <article className="col-span-5 md:col-span-3 flex flex-col gap-3">
          {posts.map(post => {
            return (
              <Link href={`/post/${post.id}`} key={post.id}>
                <Article article={post} key={post.id} />
              </Link>
            );
          })}
        </article>
        <aside className="hidden md:block md:col-span-1">
          <div className="sticky top-12 p-3"></div>
        </aside>
        <div className="md:hidden"></div>
      </div>
    </main>
  );
}
