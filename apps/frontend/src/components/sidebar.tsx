import { useEffect } from 'react';
import { SideNav } from '@/components/side-nav';
import { UpperNavItems, LowerNavItems } from '@/components/constants/side-nav';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const isBetweenMDAndLG = screenWidth >= 768 && screenWidth < 1024;
      if (isBetweenMDAndLG) {
        if (isOpen) {
          toggle();
        }
      } else {
        if (!isOpen) {
          toggle();
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, toggle]);
  return (
    <nav
      className={cn(
        `relative hidden h-screen pt-4 md:block bg-bgAuxiliary1 text-white w-12 lg:w-36 top-0 relative sticky`,
        className
      )}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col justify-start">
          {isOpen && <span className="text-center text-2xl font-bold tracking-tighter ">100xchess</span>}

          <SideNav
            className="opacity-0 transition-all duration-300 group-hover:z-50  group-hover:rounded group-hover:bg-black p-1 group-hover:opacity-100"
            items={UpperNavItems}
          />
        </div>

        <div className="flex flex-col justify-end mb-2">
          <SideNav
            className="opacity-0 transition-all duration-300 group-hover:z-50  group-hover:rounded group-hover:bg-black p-1 group-hover:opacity-100"
            items={LowerNavItems}
          />
        </div>
      </div>
    </nav>
  );
}
