import Link from 'next/link';
import categoriesList from '@/lib/asset/category';
export default function FilteredCategory({ current }: { current: string }) {
  return categoriesList.map(category => {
    if (category === '-') {
      return (
        <Link href="/" key={category}>
          <div className="p-3">전체</div>
        </Link>
      );
    }
    return (
      <Link href={`/?category=${category}`} key={category}>
        <div className={`p-3 mainCategory ${category === current ? 'text-yellow-300' : ''}`}>
          {category}
        </div>
      </Link>
    );
  });
}
