import Link from 'next/link';
import categoriesList from '@/lib/asset/category';

interface FilteredCategory {
  current: string | string[] | undefined;
}

export default function FilteredCategory({ current }: FilteredCategory) {
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
        <div className={`mainCategory p-3 ${category === current ? 'text-yellow-300' : ''}`}>
          {category}
        </div>
      </Link>
    );
  });
}
