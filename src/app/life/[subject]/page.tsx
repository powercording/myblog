import PostGrid from '@/components/PostGrid';
import Link from 'next/link';

export default function DailyPage({ params: { subject } }) {
  return (
    <PostGrid leftMenu={<div>왼쪽 메뉴</div>} rightMenu={<div>오른쪽 메뉴</div>}>
      {true ? (
        <div>트루</div>
      ) : (
        <Link className="self-center p-5 text-yellow-300" href="/">
          이 카테고리의 포스트는 아직 작성되지 않았어요.
          <br />
          터치하면 메인으로 돌아갑니다.
        </Link>
      )}
    </PostGrid>
  );
}
