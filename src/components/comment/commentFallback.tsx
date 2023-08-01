import Spinner from '../loading/spinner';

export default function CommentFallback() {
  return (
    <div className="relative col-span-3 flex h-[calc(100vh-220px)] w-full animate-pulse items-center justify-center gap-2 border opacity-50 lg:col-span-2">
      <Spinner /> Reply loading...
    </div>
  );
}
