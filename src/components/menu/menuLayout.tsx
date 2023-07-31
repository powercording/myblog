'use client';

import * as Nav from '@radix-ui/react-navigation-menu';
import { useRef, useState } from 'react';
import MenuItem, { MenuListProps } from './menuItem';
import { SlOptionsVertical } from 'react-icons/sl';
import { Session } from 'next-auth';

interface MenuComponentProps {
  menuList: MenuListProps[];
  session: Session | null;
}

export default function MenuLayout({ menuList, session }: MenuComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  return (
    <Nav.Root className="fixed top-0 md:bg-zinc-900 md:w-full text-white z-50">
      <button
        className="md:hidden absolute p-5 z-50 bg-zinc-900 bg-opacity-60 rounded-full"
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        <SlOptionsVertical className={`${isMenuOpen ? 'rotate-90' : ''} transition-transform`} />
      </button>
      <Nav.List
        ref={menuRef}
        className={`w-40 h-screen flex flex-col gap-3 px-3 pt-16  
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full '} 
          transition-transform md:flex md:flex-row md:h-fit md:w-full md:-translate-x-0 md:p-3 w-80% bg-zinc-900`}
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
