import { useState } from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';
import Header from './Header';

// Define the props for SideMenu component
interface SideMenuProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
}

const Layout: FC = () => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const toggleMinimize = (): void => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideMenu 
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
      />
      
      <main 
        className={`flex-grow transition-all duration-300 ease-in-out 
          ${isMinimized ? 'ml-16' : 'ml-64'}`}
      >
        <Header isMinimized={isMinimized} />
        <div className="pt-24 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;