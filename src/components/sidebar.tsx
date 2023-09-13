import React from 'react';
import { Elements } from '@/Layout/sidebarElements';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  elements: Elements[];
}

type Variant = 'secondary' | 'ghost' | 'link' | 'default' | 'destructive' | 'outline' | null | undefined;

export function Sidebar({ className, elements }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSidebarElementClick = (path: string): void => {
    navigate(path);
  };

  return (
    <div className={cn('pb-12', className)}>
      <div style={{ height: '80vh' }}>
        <div className="space-y-4 py-4 max-w-xs">
          {elements?.map((element, i) => (
            <div className="px-3 py-2" key={i}>
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{element.name}</h2>
              <div className="space-y-1">
                {element.links?.map((link, j) => (
                  <Button
                    variant={location.pathname !== link.path ? 'ghost' : (link.variant as Variant)}
                    className="w-full justify-start"
                    key={j}
                    onClick={() => handleSidebarElementClick(link.path)}
                  >
                    <div className="mx-2">{link.icon}</div>
                    {link.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
