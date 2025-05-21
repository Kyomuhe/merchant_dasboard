import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import {
  LayoutGrid, Settings, ChevronsLeft, ChevronsRight, Store,
  ShoppingCart, Truck, Users, Pill, LineChart, Bell, Package,
  ClipboardList, FileText, CreditCard, Map, MessageSquare, Stethoscope
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import logo from '../assets/logo.png';

// Define types for menu items
interface SubMenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path?: string;
  subItems?: SubMenuItem[];
}

// Props type for SideMenu component
interface SideMenuProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
}

const menuItems: MenuItem[] = [
  { 
    icon: LayoutGrid, 
    label: 'Dashboard', 
    path: '/dashboard' 
  },
  { 
    icon: Package, 
    label: 'Product Management',
    subItems: [
      { icon: ClipboardList, label: 'Inventory Listing', path: '/products/inventory' },
      { icon: FileText, label: 'Add/Edit Products', path: '/products/manage' },
      { icon: Store, label: 'Categories', path: '/products/categories' },
      { icon: Pill, label: 'Prescription Medicines', path: '/products/prescription' },
      { icon: Store, label: 'OTC Items', path: '/products/otc' }
    ] 
  },
  { 
    icon: ShoppingCart, 
    label: 'Order Management',
    subItems: [
      { icon: Bell, label: 'New Orders', path: '/orders/new' },
      { icon: ClipboardList, label: 'Processing Orders', path: '/orders/processing' },
      { icon: FileText, label: 'Completed Orders', path: '/orders/completed' },
      { icon: Store, label: 'Canceled/Returned', path: '/orders/canceled' },
      { icon: Pill, label: 'Prescription Verification', path: '/orders/verification' }
    ]
  },
  { 
    icon: Truck, 
    label: 'Delivery Management',
    subItems: [
      { icon: Truck, label: 'Track Deliveries', path: '/delivery/track' },
      { icon: Users, label: 'Delivery Personnel', path: '/delivery/personnel' },
      { icon: Map, label: 'Delivery Zones', path: '/delivery/zones' },
      { icon: Package, label: 'Special Handling', path: '/delivery/special' }
    ]
  },
  { 
    icon: Users, 
    label: 'Customer Management',
    subItems: [
      { icon: Users, label: 'Customer Database', path: '/customers/database' },
      { icon: FileText, label: 'Patient Profiles', path: '/customers/profiles' },
      { icon: ClipboardList, label: 'Prescription History', path: '/customers/prescriptions' },
      { icon: MessageSquare, label: 'Communication Tools', path: '/customers/communication' }
    ]
  },
  { 
    icon: Pill, 
    label: 'Pharmacy',
    subItems: [
      { icon: ClipboardList, label: 'Prescription Validation', path: '/pharmacy/validation' },
      { icon: FileText, label: 'Drug Interaction Checker', path: '/pharmacy/interactions' },
      { icon: Store, label: 'Regulatory Compliance', path: '/pharmacy/compliance' },
      { icon: Bell, label: 'Expiration Tracking', path: '/pharmacy/expiration' }
    ]
  },
  { 
    icon: LineChart, 
    label: 'Analytics', 
    path: '/analytics'
  },
  { 
    icon: Settings, 
    label: 'Settings',
    subItems: [
      { icon: Users, label: 'Account Settings', path: '/settings/account' },
      { icon: Store, label: 'Store Information', path: '/settings/store' },
      { icon: CreditCard, label: 'Payment Methods', path: '/settings/payment' },
      { icon: Bell, label: 'Notifications', path: '/settings/notifications' },
      { icon: Settings, label: 'Platform Integration', path: '/settings/integration' }
    ]
  },
];

const SideMenu: React.FC<SideMenuProps> = ({ isMinimized, toggleMinimize }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation(); 

  const isActive = (path: string): boolean => location.pathname.startsWith(path);

  const handleMenuClick = (item: MenuItem): void => {
    if (item.subItems) {
      setExpandedItem(expandedItem === item.label ? null : item.label);
    }
  };

  return (
    <div className={`bg-white h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out 
        ${isMinimized ? 'w-16' : 'w-64'} flex flex-col z-20
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleMinimize}
        className="absolute top-4 -right-6 z-10 bg-white border rounded-full p-1 shadow-md hover:bg-blue-50"
      >
        {isMinimized ? <ChevronsRight className="w-5 h-5 text-blue-600" /> : <ChevronsLeft className="w-5 h-5 text-blue-600" />}
      </button>

      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center border-b border-gray-100">
        {isMinimized ? (
          <Stethoscope className="text-blue-600 w-8 h-8" />
        ) : (
          <div className="flex items-center space-x-2">
            <Stethoscope className="text-blue-600 w-8 h-8" />
            <img src={logo} alt="logo" className="w-36 h-10" />
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-grow pt-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index}>
            <div
              className={`hover:bg-blue-50 cursor-pointer group ${item.path && isActive(item.path) ? 'bg-blue-50' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              <Link
                to={item.path || '#'}
                className={`flex items-center ${isMinimized ? 'justify-center' : 'px-6'} py-3 
                  ${item.path && isActive(item.path) ? 'border-r-4 border-blue-600' : ''}`}
              >
                <item.icon
                  className={`group-hover:text-blue-600 ${item.path && isActive(item.path) ? 'text-blue-600' : 'text-gray-500'} 
                    ${isMinimized ? 'mx-auto' : 'mr-4'}`}
                  size={20}
                />
                {!isMinimized && (
                  <span className={`text-sm ${item.path && isActive(item.path) ? 'text-blue-600 font-semibold' : 'text-gray-700'} 
                    group-hover:text-blue-600`}>
                    {item.label}
                  </span>
                )}
              </Link>
            </div>

            {/* Sub Items */}
            {!isMinimized && item.subItems && expandedItem === item.label && (
              <div className="pl-14 space-y-1">
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    to={subItem.path}
                    key={subIndex}
                    className={`block text-sm py-1 text-gray-600 hover:text-blue-600 hover:font-medium
                      ${isActive(subItem.path) ? 'text-blue-600 font-medium' : ''}`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {!isMinimized && (
        <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-100">
          © 2025 PharmConnect
        </div>
      )}
    </div>
  );
};

export default SideMenu;