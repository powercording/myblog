import Link from 'next/link';

type RemarkLinkProps = {
  children: React.ReactNode;
  href: string;
};

export default function RemarkLink(props: RemarkLinkProps) {
  const { children, href } = props;

  return (
    <Link href={href} target="_blank">
      {children}
    </Link>
  );
}
