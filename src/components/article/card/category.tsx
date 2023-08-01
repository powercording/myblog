import { Post } from './article';

type Category = {
  categories: Pick<Post, 'categories'>['categories'];
};

export default function Category({ categories }: Category) {
  return (
    <>
      {categories && (
        <span
          className="rounded-full border border-gray-400 bg-slate-400 px-2 py-1 text-xs text-white group-hover/post:bg-slate-700 group-hover/post:drop-shadow-lg"
          key={categories}
        >
          {categories}
        </span>
      )}
    </>
  );
}
