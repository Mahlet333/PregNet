import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import NetworkPage from './pages/NetworkPage';
import HelpAndAdvice from './components/HelpAndAdvice';
import ItemSharing from './components/ItemSharing';
import GroupActivities from './components/GroupActivities';
import MentalHealth from './components/MentalHealth';
import Marketplace from './components/Marketplace';
import Chatbot from './components/Chatbot';

function App() {
  const [activeSection, setActiveSection] = useState('profile');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'network':
        return <NetworkPage />;
      case 'help':
        return <HelpAndAdvice />;
      case 'items':
        return <ItemSharing />;
      case 'activities':
        return <GroupActivities />;
      case 'mental-health':
        return <MentalHealth />;
      case 'marketplace':
        return <Marketplace />;
      case 'chatbot':
        return <Chatbot />;
      default:
        return <Profile />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-purple-50 flex flex-col">
        <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
        
        <footer className="bg-white border-t border-purple-100 py-6 mt-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">PregNet</h3>
              <p className="text-sm text-purple-600 mb-4">
                The Networked Pregnancy & Postpartum Support Platform
              </p>
              <p className="text-xs text-purple-500">
                This is a demo application showcasing network theory, game theory, and market design concepts.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;