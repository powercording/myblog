import { dateFormatter } from '@/lib/util/dateTimeFormatter';

interface NameAndInfo {
  userName: string;
  createdAt: string;
}

export default function NameAndInfo({ userName, createdAt }: NameAndInfo) {
  return (
    <div className="h-full  w-[50%] grow group-hover/post:text-gray-600 md:break-words">
      <h3 className=" text-sm text-gray-600 group-hover/post:text-emerald-500 md:text-lg">
        by {userName}
      </h3>
      <p className="text-xs text-gray-400 group-hover/post:text-gray-600">
        {dateFormatter(createdAt)}
      </p>
    </div>
  );
}
