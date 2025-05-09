import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Package, Share2, Clock, Check, X, Search, FileQuestion } from 'lucide-react';

const ItemSharing: React.FC = () => {
  const { items, requestItem, lendItem, returnItem, currentUser } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const categories = ['All', 'Feeding', 'Carriers', 'Comfort', 'Baby Gear', 'Clothing'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group items by their status
  const availableItems = filteredItems.filter(item => item.status === 'available');
  const borrowedItems = filteredItems.filter(item => item.status === 'borrowed');
  const pendingItems = filteredItems.filter(item => item.status === 'pending');

  // Items that belong to the current user
  const myItems = filteredItems.filter(item => item.ownerId === currentUser.id);
  // Items that the current user is borrowing
  const borrowingItems = filteredItems.filter(item => item.borrowerId === currentUser.id);

  // Mock data - replace with actual data from your backend
  const mockItems = [
    {
      id: '1',
      name: 'Pregnancy Pillow',
      description: 'Full body support pillow for comfortable sleep during pregnancy',
      category: 'Comfort',
      status: 'available',
      ownerId: currentUser.id,
      image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQPb33a0EjaTP1n2b7uSoGfuddZyRWTF2-WV6n0otJBdzKXfA2nkrO7LB4FyDfaoCitc1ma2IXZcVeDTMAh0OzIRYNvQJZrYLcs7fWQS7s_3i3C6Yk5LbGqLg'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-900 flex items-center">
            <Package className="h-6 w-6 text-purple-600 mr-2" />
            Item Sharing Network
          </h2>
          
          <button 
            onClick={() => setShowInfoModal(true)}
            className="text-purple-600 hover:text-purple-800 focus:outline-none transition-colors duration-200 flex items-center"
          >
            <FileQuestion className="h-5 w-5 mr-1" />
            <span className="text-sm">How it works</span>
          </button>
        </div>
        
        <p className="text-sm text-purple-700 mb-6">
          Borrow items you need temporarily or lend items you're not using to help others.
          Our matching algorithm ensures fair allocation based on crowns and need.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search" className="block text-sm font-medium text-purple-700 mb-1">
              Search Items
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search by name or description..."
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />
            </div>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-purple-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Items Section */}
          {myItems.length > 0 && (
            <div className="bg-purple-50 p-4 rounded-lg col-span-full">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">My Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {myItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
                    <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded-lg mb-3" />
                    <h4 className="font-medium text-purple-900">{item.name}</h4>
                    <p className="text-sm text-purple-700 mt-1 flex-grow">{item.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-purple-600">{item.category}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'available' ? 'bg-green-100 text-green-800' : 
                        item.status === 'borrowed' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    
                    {item.status === 'pending' && (
                      <div className="mt-3 flex justify-between gap-2">
                        <button
                          onClick={() => lendItem(item.id, item.borrowerId!)}
                          className="flex-1 px-2 py-1 bg-green-600 text-white text-sm rounded-md shadow-sm hover:bg-green-700 focus:outline-none transition-colors duration-200 flex items-center justify-center"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => returnItem(item.id)}
                          className="flex-1 px-2 py-1 bg-red-600 text-white text-sm rounded-md shadow-sm hover:bg-red-700 focus:outline-none transition-colors duration-200 flex items-center justify-center"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Borrowing Items Section */}
          {borrowingItems.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg col-span-full">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Items I'm Borrowing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {borrowingItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
                    <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded-lg mb-3" />
                    <h4 className="font-medium text-purple-900">{item.name}</h4>
                    <p className="text-sm text-purple-700 mt-1 flex-grow">{item.description}</p>
                    {item.dueDate && (
                      <div className="flex items-center mt-2 text-xs text-purple-600">
                        <Clock className="h-3 w-3 mr-1" />
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-purple-600">{item.category}</span>
                      <button
                        onClick={() => returnItem(item.id)}
                        className="px-2 py-1 bg-purple-600 text-white text-xs rounded-md shadow-sm hover:bg-purple-700 focus:outline-none transition-colors duration-200"
                      >
                        Return Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Available Items */}
          {availableItems.filter(item => item.ownerId !== currentUser.id).map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 border border-purple-100 hover:border-purple-300 transition-colors duration-200 flex flex-col">
              <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded-lg mb-3" />
              <h3 className="font-medium text-purple-900">{item.name}</h3>
              <p className="text-sm text-purple-700 mt-1 flex-grow">{item.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
                <button
                  onClick={() => requestItem(item.id)}
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md shadow-sm hover:bg-purple-700 focus:outline-none transition-colors duration-200 flex items-center"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Request
                </button>
              </div>
            </div>
          ))}
          
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-8 text-purple-600">
              <Package className="h-12 w-12 mx-auto mb-3 text-purple-400" />
              <p>No items found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-purple-900 mb-4">How Item Sharing Works</h3>
            
            <div className="space-y-4 text-sm text-purple-800">
              <p>
                <span className="font-semibold">Matching Algorithm:</span> When multiple users request the same item, 
                our system uses a fair matching algorithm based on crowns and urgency of need.
              </p>
              
              <p>
                <span className="font-semibold">Crown Priority:</span> Users with higher crowns (earned by helping others) 
                receive higher priority in the matching process, creating positive incentives for community participation.
              </p>
              
              <p>
                <span className="font-semibold">For High-Demand Items:</span> We use a silent auction mechanism where crowns 
                serve as "bids." This applies game theory principles to ensure optimal resource allocation.
              </p>
              
              <p>
                <span className="font-semibold">Lending Benefits:</span> When you lend items, you earn crowns that 
                increase your priority for future requests.
              </p>
            </div>
            
            <button
              onClick={() => setShowInfoModal(false)}
              className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none transition-colors duration-200"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemSharing;