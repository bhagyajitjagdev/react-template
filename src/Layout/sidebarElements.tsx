import { AtSign, Component, Home, UserCircle } from 'lucide-react';

export type Elements = (typeof elements)[number];

export const elements = [
  {
    name: 'Main',
    links: [
      {
        variant: 'default',
        icon: <Home />,
        name: 'Home',
        path: '/auth',
      },
      {
        variant: 'default',
        icon: <AtSign />,
        name: 'About',
        path: '/auth/about',
      },
    ],
  },
  {
    name: 'Settings',
    links: [
      {
        variant: 'default',
        icon: <UserCircle />,
        name: 'Profile',
        path: '/profile',
      },
      {
        variant: 'default',
        icon: <Component />,
        name: 'Category',
        path: '/category',
      },
    ],
  },
];
