'use client';

import * as Nav from '@radix-ui/react-navigation-menu';
import { useRef, useState } from 'react';
import MenuItem, { MenuListProps } from './menuItem';
import { SlOptionsVertical } from 'react-icons/sl';
import { Session } from 'next-auth';
import { BsFillSignIntersectionFill } from 'react-icons/bs';

interface MenuComponentProps {
  menuList: MenuListProps[];
  session: Session | null;
}

export default function MenuLayout({ menuList, session }: MenuComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  return (
    <Nav.Root className="fixed top-0 z-50 text-white md:w-full md:bg-zinc-900">
      <button
        className="absolute z-50 rounded-full bg-zinc-900 bg-opacity-60 p-5 md:hidden"
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        <BsFillSignIntersectionFill
          className={`${isMenuOpen ? 'rotate-90' : ''} transition-transform`}
        />
      </button>
      <Nav.List
        ref={menuRef}
        className={`flex h-screen w-40 flex-col gap-3 px-3 pt-16  
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full '} 
          w-80% bg-zinc-900 transition-transform md:flex md:h-fit md:w-full md:-translate-x-0 md:flex-row md:p-3`}
      >
        {menuList.map(menu => {
          return <MenuItem key={menu.key} href={menu.href} locationName={menu.locationName} />;
        })}
      </Nav.List>
      {/* 
      <Nav.List className="hidden md:flex p-3 gap-3 ">
        {menuList.map(menu => {
          return <MenuItem key={menu.key} href={menu.href} locationName={menu.locationName} />;
        })}
      </Nav.List> */}
    </Nav.Root>
  );
}
