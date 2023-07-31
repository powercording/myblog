import Spinner from '../loading/spinner';

export default function CommentFallback() {
  return (
    <div className="w-full h-[calc(100vh-220px)] border col-span-3 lg:col-span-2 animate-pulse opacity-50 relative flex justify-center items-center gap-2">
      <Spinner /> Reply loading...
    </div>
  );
}
