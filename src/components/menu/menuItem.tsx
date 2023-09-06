import * as Nav from '@radix-ui/react-navigation-menu';
import { signOut } from 'next-auth/react';

export type MenuListProps = {
  locationName: string;
  href: string | undefined;
} & React.ComponentProps<typeof Nav.Link>;

export default function MenuItem({ locationName, href }: MenuListProps) {
  const isLogOut = locationName === 'Logout';

  const logout = async () => {
    const path = await signOut({ callbackUrl: '/', redirect: false });
    window.location.href = path.url;
  };

  return (
    <Nav.Item onClick={isLogOut ? logout : console.log}>
      <Nav.Link className="NavigationMenuLink" href={href}>
        {locationName}
      </Nav.Link>
    </Nav.Item>
  );
}
