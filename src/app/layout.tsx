import './globals.css';
import { Inter } from 'next/font/google';
import { MenuListProps } from '@/components/menu/menuItem';
import MenuLayout from '@/components/menu/menuLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth/options';
import ToastContextProvider from '@/context/ToastContextProvider';
import ToastViewer from '@/context/toastViewer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MYBLOG',
  description: '기술, 일상 기록 블로그',
};

const menuList: MenuListProps[] = [
  {
    locationName: 'Home',
    href: '/',
    key: 'home',
  },
  {
    locationName: 'Ai-Chat',
    href: '/ai',
    key: 'ai',
  },
];

const withLogInMenu: MenuListProps[] = [
  {
    locationName: 'Add Post',
    href: '/post/add',
    key: 'addPost',
  },
  {
    locationName: 'My Page',
    href: '/mypage',
    key: 'mypage',
  },
  { locationName: 'Logout', href: undefined, key: 'logout' },
];

const withLogOutMenu: MenuListProps[] = [
  {
    locationName: 'Login',
    href: '/login',
    key: 'login',
  },
  {
    locationName: 'Join',
    href: '/join',
    key: 'join',
  },
];

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  let currentMenu: MenuListProps[] = menuList;

  if (session) {
    currentMenu = [...menuList, ...withLogInMenu];
  }

  if (!session) {
    currentMenu = [...menuList, ...withLogOutMenu];
  }

  return (
    <ToastContextProvider>
      <html lang="kr">
        <body className={`${inter.className} h-auto min-h-screen`}>
          <MenuLayout menuList={currentMenu} session={session}></MenuLayout>
          {children}
          <footer className="flex h-20 w-full items-center justify-center gap-5 bg-gray-900 text-gray-400">
            <span>powered by Next.js | author: powercording</span>
            <span>HP: 01020732223</span>
          </footer>
          <ToastViewer />
        </body>
      </html>
    </ToastContextProvider>
  );
}
