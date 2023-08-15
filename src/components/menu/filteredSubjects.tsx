import Link from 'next/link';
import { subjects } from '@/lib/asset/category';

interface FilteredCategory {
  current: string | string[] | undefined;
  // categories?: string[]; 나중을 위해.
}

export default function FilteredCategory({ current }: FilteredCategory) {
  return subjects.map(category => {
    if (category.title === '-' || category.title === '전체') {
      return (
        <Link href="/" key={category.title}>
          <div className="p-3">전체</div>
        </Link>
      );
    }
    return (
      <Link href={category.path} key={category.title}>
        <div className={`mainCategory p-3 ${category.path === current ? 'text-yellow-300' : ''}`}>
          {category.title}
        </div>
      </Link>
    );
  });
}
