import Spinner from '@/components/loading/spinner';

export default function HeaderFallback() {
  return (
    <div className="mt-12 min-h-fit  bg-slate-800 relative h-[160px] flex justify-center items-center gap-3">
      <Spinner /> header loading...
    </div>
  );
}
