import { dateFormatter } from '@/lib/util/dateTimeFormatter';

interface NameAndInfo {
  userName: string;
  createdAt: string;
}

export default function NameAndInfo({ userName, createdAt }: NameAndInfo) {
  return (
    <div className="h-full  group-hover/post:text-gray-600 w-[50%] md:break-words grow">
      <h3 className=" md:text-lg text-sm text-gray-600 group-hover/post:text-emerald-500">
        by {userName}
      </h3>
      <p className="text-xs text-gray-400 group-hover/post:text-gray-600">
        {dateFormatter(createdAt)}
      </p>
    </div>
  );
}
