import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Menu, X, User, MessageCircle, Heart, Package, Users, Activity, ShoppingBag, HelpCircle } from 'lucide-react';

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, setActiveSection }) => {
  const { currentUser } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Profile', icon: <User size={20} />, id: 'profile' },
    { name: 'Network', icon: <Users size={20} />, id: 'network' },
    { name: 'Help & Advice', icon: <MessageCircle size={20} />, id: 'help' },
    { name: 'Item Sharing', icon: <Package size={20} />, id: 'items' },
    { name: 'Group Activities', icon: <Activity size={20} />, id: 'activities' },
    { name: 'Mental Health', icon: <Heart size={20} />, id: 'mental-health' },
    { name: 'Marketplace', icon: <ShoppingBag size={20} />, id: 'marketplace' },
    { name: 'Chatbot', icon: <HelpCircle size={20} />, id: 'chatbot' },
  ];

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    setActiveSection('profile');
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-200 to-pink-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <span className="text-purple-700 font-bold text-xl">PregNet</span>
              <span className="ml-2 text-xs text-purple-600 hidden sm:inline">Networked Pregnancy Support</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-purple-500 text-white'
                    : 'text-purple-700 hover:bg-purple-300'
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleNav}
              className="p-2 rounded-md text-purple-700 hover:bg-purple-300 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-2">
              <img 
                src={currentUser.profilePic} 
                alt={currentUser.name} 
                className="h-8 w-8 rounded-full border-2 border-purple-400"
              />
              <span className="text-sm font-medium text-purple-800">{currentUser.name}</span>
              <span className="bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs">
                {currentUser.karma} crowns
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="bg-white shadow-xl rounded-b-lg border-t border-purple-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-purple-500 text-white'
                    : 'text-purple-700 hover:bg-purple-300'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
            
            <div className="flex items-center space-x-2 p-3 border-t border-purple-100 mt-2">
              <img 
                src={currentUser.profilePic} 
                alt={currentUser.name} 
                className="h-8 w-8 rounded-full border-2 border-purple-400"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-purple-800">{currentUser.name}</span>
                <span className="text-xs text-purple-600">{currentUser.karma} crowns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;