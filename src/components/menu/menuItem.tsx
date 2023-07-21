import * as Nav from '@radix-ui/react-navigation-menu';
import { signOut } from 'next-auth/react';

export type MenuListProps = {
  locationName: string;
  href: string | undefined;
} & React.ComponentProps<typeof Nav.Link>;

export default function MenuItem({ locationName, href }: MenuListProps) {
  const isLogOut = locationName === 'Logout';

  return (
    <Nav.Item onClick={isLogOut ? signOut : console.log}>
      <Nav.Link className="NavigationMenuLink" href={href}>
        {locationName}
      </Nav.Link>
    </Nav.Item>
  );
}
