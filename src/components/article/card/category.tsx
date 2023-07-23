import { Post } from './article';

type Category = {
  categories: Pick<Post, 'categories'>['categories'];
};

export default function Category({ categories }: Category) {
  return (
    <>
      {categories && (
        <span
          className="px-2 py-1 rounded-full border border-gray-400 text-xs bg-slate-400 text-white group-hover/post:bg-slate-700 group-hover/post:drop-shadow-lg"
          key={categories}
        >
          {categories}
        </span>
      )}
    </>
  );
}
