const formatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const passedFormatter = new Intl.RelativeTimeFormat("ko", {
  numeric: "auto",
});

export const dateFormat = (date: Date) => {
  return formatter.format(date);
};

export const dateFormatter = (date: string) => {
  const writtenDate = new Date(date);
  const diff = Date.now() - writtenDate.getTime();
  const diffDay = diff / (1000 * 60 * 60 * 24);
  const dayAgo = Number(diffDay.toFixed(0));

  return passedFormatter.format(-dayAgo, "day");
};
