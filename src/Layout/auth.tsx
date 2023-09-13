import { useEffect, useState } from 'react';
import { avatar } from '@/assets';
import { ModeToggle } from '@/components/mode-toggle';
import { Sidebar } from '@/components/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Outlet, useLocation } from 'react-router-dom';
import { elements } from './sidebarElements';

export default function Auth() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isName, setName] = useState('react-template');
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const pageName = location.pathname;
  useEffect(() => {
    elements.forEach((item) => {
      item.links.forEach((link) => {
        if (pageName.includes(link.path)) {
          setName(link.name);
          document.title = link.name || 'react-template';
        }
      });
    });
  }, [pageName]);

  return (
    <>
      <div className="flex h-16 items-center px-4">
        <Avatar className="h-8 w-8" onClick={toggleSidebar}>
          <AvatarImage src={avatar} alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="ml-auto flex items-center space-x-4">
          <div>
            <Input type="search" placeholder="Search..." className="md:w-[100px] lg:w-[300px]" />
          </div>
          <ModeToggle />
        </div>
      </div>

      <main className="flex">
        <Sidebar className={isSidebarVisible ? 'slide-in' : 'slide-out'} elements={elements} />

        <Card className="w-full min-h-[80vh] mx-4 mb-4">
          <CardHeader>
            <CardTitle>{isName}</CardTitle>
          </CardHeader>
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
