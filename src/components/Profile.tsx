import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, Clock, Heart, Star, Award, Gift, User as UserIcon } from 'lucide-react';

const Profile: React.FC = () => {
  const { currentUser } = useAppContext();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto">
      {/* Profile Image Container */}
      <div className="relative w-48 h-48 mb-6">
        <div className="absolute inset-0 bg-white rounded-full shadow-lg"></div>
        {!imageError ? (
          <img
            className="absolute inset-0 w-full h-full rounded-full object-cover"
            src={currentUser.profilePic}
            alt={currentUser.name}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-4xl text-purple-500">?</span>
          </div>
        )}
      </div>

      {/* User Info */}
      <h1 className="text-2xl font-bold text-purple-900 mb-4">{currentUser.name}</h1>
      
      <div className="flex items-center mb-4">
        <Star className="w-5 h-5 text-yellow-500 mr-2" />
        <span className="text-purple-900">{currentUser.trustScore} Trust Score</span>
      </div>

      <div className="bg-purple-600 text-white px-6 py-2 rounded-full mb-6">
        <span>{currentUser.karma} crowns</span>
      </div>

      <div className="flex items-center mb-4 text-purple-900">
        <Calendar className="w-5 h-5 mr-2" />
        <span>Due Date: {new Date(currentUser.dueDate || '').toLocaleDateString()}</span>
      </div>

      <div className="flex items-center text-purple-900">
        <Clock className="w-5 h-5 mr-2" />
        <span>Stage: {currentUser.stage}</span>
      </div>

      <style jsx>{`
        .profile-image-container {
          position: relative;
          width: 200px;
          height: 200px;
          margin-bottom: 2rem;
        }
        .profile-image-container::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: white;
          z-index: -1;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Profile;