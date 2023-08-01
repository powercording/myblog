import Spinner from '@/components/loading/spinner';

export default function HeaderFallback() {
  return (
    <div className="relative mt-12  flex h-[160px] min-h-fit items-center justify-center gap-3 bg-slate-800">
      <Spinner /> header loading...
    </div>
  );
}
