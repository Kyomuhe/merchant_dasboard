import { useState, useRef, useEffect } from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
// import NotificationsModal from '../models/notifications'; 
// import ProfileModal from '../models/profile'; 
import merchant from '../assets/merchant.PNG'; 

// Define TypeScript interfaces
interface DoctorStats {
  patients: number;
  years: number;
  certifications: number;
}

interface Doctor {
  name: string;
  specialty: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  stats: DoctorStats;
}

interface HeaderProps {
  isMinimized: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMinimized }) => {
  //  state for controlling the notifications modal
  const [showNotificationsModal, setShowNotificationsModal] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(6);
  
  // state for controlling the profile modal
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  
  // state for dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  
  // Ref for dropdown component to detect outside clicks
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Function to handle opening the notifications modal
  const openNotificationsModal = (): void => {
    setShowNotificationsModal(true);
    setUnreadCount(0);
  };

  const toggleDropdown = (): void => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Doctor data
  const doctorData: Doctor = {
    name: "Dr. Galanda Wafula Hassan",
    specialty: "Cardiologist",
    avatar: merchant,
    email: "dr.galanda@medicenter.com",
    phone: "+254 712 345 678",
    location: "Nairobi Medical Center",
    education: "MD, University of Nairobi • Cardiology Fellowship, Kenyatta Hospital",
    stats: {
      patients: 1250,
      years: 13,
      certifications: 5
    }
  };

  return (
    <header className={`
      bg-white shadow-sm w-full fixed top-0 left-0 z-10
      transition-all duration-300 ease-in-out
      ${isMinimized ? 'pl-16' : 'pl-64'}
    `}>
      <div className="flex items-center justify-between h-20 px-6 pr-6">
        {/* Search Bar */}
        <div className="relative flex-grow max-w-md mr-6">
          <input 
            type="text" 
            placeholder="Search sales, records, products..." 
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
          />
          <Search className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          {/* Notifications*/}
          <div className="relative">
            <button
              onClick={openNotificationsModal}
              className="relative focus:outline-none"
              aria-label="Notifications"
            >
              <Bell className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* User Profile with Click-Based Dropdown */}
          <div ref={dropdownRef} className="relative">
            <div 
              onClick={toggleDropdown}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={merchant}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Dr. Galanda Wafula Hassan</p>
                  <p className="text-xs text-gray-500">Cardiologist</p>
                </div>
                <ChevronDown className={`ml-2 text-gray-500 transition-transform duration-300 ${dropdownOpen ? 'transform rotate-180' : ''}`} />
              </div>
            </div>
            
            {/* Dropdown Menu - Visible based on state, not hover */}
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100 z-20">
                <div className="py-2">
                  <button 
                    onClick={() => {
                      setShowProfileModal(true);
                      setDropdownOpen(false);
                    }} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </button>
                  <div className="border-t border-gray-100"></div>
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Logout</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      {/* <NotificationsModal 
        isOpen={showNotificationsModal} 
        onClose={() => setShowNotificationsModal(false)} 
      /> */}

      {/* Profile Modal */}
      {/* <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        doctor={doctorData}
      /> */}
    </header>
  );
};

export default Header;