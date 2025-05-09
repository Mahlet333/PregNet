import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ShoppingBag, Star, Calendar, MessageCircle, TrendingUp, Users, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  seller: {
    name: string;
    rating: number;
    trustScore: number;
    empowermentPoints: number;
  };
  image: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  type: 'virtual' | 'local';
  seller: {
    name: string;
    rating: number;
    trustScore: number;
    empowermentPoints: number;
  };
  availability: string[];
  image: string;
}

const Marketplace: React.FC = () => {
  const { currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listingType, setListingType] = useState<'product' | 'service'>('product');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [newListing, setNewListing] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    type: 'virtual' as 'virtual' | 'local',
    availability: [] as string[],
  });

  // Mock data - replace with actual data from your backend
  const products: Product[] = [
    {
      id: '1',
      name: 'Handmade Baby Blanket',
      description: 'Soft, organic cotton blanket perfect for newborns',
      price: 25.99,
      category: 'crafts',
      seller: {
        name: 'Sarah M.',
        rating: 4.8,
        trustScore: 95,
        empowermentPoints: 120,
      },
      image: 'https://i.etsystatic.com/12239388/r/il/9db226/4801430302/il_570xN.4801430302_9ij3.jpg',
    },
    {
      id: '2',
      name: 'Organic Baby Food Set',
      description: 'Set of 6 organic, homemade baby food jars',
      price: 35.99,
      category: 'snacks',
      seller: {
        name: 'Maria K.',
        rating: 4.9,
        trustScore: 97,
        empowermentPoints: 135,
      },
      image: 'https://m.media-amazon.com/images/I/71KLpSq80WL._AC_UF894,1000_QL80_.jpg',
    },
    {
      id: '3',
      name: 'Digital Pregnancy Planner',
      description: 'Comprehensive digital planner for expecting mothers',
      price: 19.99,
      category: 'digital',
      seller: {
        name: 'Lisa P.',
        rating: 4.7,
        trustScore: 93,
        empowermentPoints: 110,
      },
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: '4',
      name: 'Hand-knitted Baby Booties',
      description: 'Adorable, warm booties for newborns',
      price: 15.99,
      category: 'crafts',
      seller: {
        name: 'Emma R.',
        rating: 4.8,
        trustScore: 96,
        empowermentPoints: 125,
      },
      image: 'https://www.atlantic-shore.co.uk/wp-content/uploads/2021/06/%E2%80%98Sheep-by-the-Sea-Hand-Knitted-Luxury-Baby-Booties.jpg',
    },
    {
      id: '5',
      name: 'Pregnancy Yoga Guide',
      description: 'Digital guide with safe yoga poses for each trimester',
      price: 24.99,
      category: 'digital',
      seller: {
        name: 'Sophie T.',
        rating: 4.9,
        trustScore: 98,
        empowermentPoints: 140,
      },
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGKIL2CkJ-xuxQPw5JpAhK_pSE33PgNt2WEg&s',
    },
    {
      id: '6',
      name: 'Organic Nursing Tea',
      description: 'Herbal tea blend to support breastfeeding',
      price: 12.99,
      category: 'snacks',
      seller: {
        name: 'Anna L.',
        rating: 4.7,
        trustScore: 94,
        empowermentPoints: 115,
      },
      image: 'https://m.media-amazon.com/images/I/51GTbibNjEL.jpg',
    }
  ];

  const services: Service[] = [
    {
      id: '1',
      name: 'Virtual Parenting Coach',
      description: 'One-on-one coaching sessions for new parents',
      price: 45.00,
      category: 'coaching',
      type: 'virtual',
      seller: {
        name: 'Emma L.',
        rating: 4.9,
        trustScore: 98,
        empowermentPoints: 150,
      },
      availability: ['Mon', 'Wed', 'Fri'],
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: '2',
      name: 'Pregnancy Yoga Instructor',
      description: 'Specialized yoga sessions for expecting mothers',
      price: 35.00,
      category: 'classes',
      type: 'virtual',
      seller: {
        name: 'Sarah K.',
        rating: 4.8,
        trustScore: 96,
        empowermentPoints: 130,
      },
      availability: ['Tue', 'Thu', 'Sat'],
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: '3',
      name: 'Local Babysitter',
      description: 'Experienced babysitter for your little ones',
      price: 20.00,
      category: 'local',
      type: 'local',
      seller: {
        name: 'Maria P.',
        rating: 4.9,
        trustScore: 97,
        empowermentPoints: 145,
      },
      availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: '4',
      name: 'Virtual Nutrition Coach',
      description: 'Personalized nutrition guidance for pregnancy',
      price: 40.00,
      category: 'coaching',
      type: 'virtual',
      seller: {
        name: 'Lisa M.',
        rating: 4.8,
        trustScore: 95,
        empowermentPoints: 125,
      },
      availability: ['Mon', 'Wed', 'Fri'],
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: '5',
      name: 'Local Meal Prep Service',
      description: 'Healthy, pregnancy-friendly meal preparation',
      price: 30.00,
      category: 'local',
      type: 'local',
      seller: {
        name: 'Sophie R.',
        rating: 4.9,
        trustScore: 98,
        empowermentPoints: 155,
      },
      availability: ['Mon', 'Wed', 'Fri'],
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: '6',
      name: 'Online Birth Preparation Class',
      description: 'Comprehensive birth preparation course',
      price: 50.00,
      category: 'classes',
      type: 'virtual',
      seller: {
        name: 'Anna T.',
        rating: 4.8,
        trustScore: 96,
        empowermentPoints: 135,
      },
      availability: ['Sat', 'Sun'],
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60',
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'crafts', name: 'Crafts' },
    { id: 'clothes', name: 'Baby Clothes' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'digital', name: 'Digital Resources' },
    { id: 'coaching', name: 'Coaching' },
    { id: 'classes', name: 'Classes' },
    { id: 'local', name: 'Local Services' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('New listing:', { ...newListing, type: listingType });
    setIsModalOpen(false);
    setNewListing({
      name: '',
      description: '',
      price: '',
      category: '',
      type: 'virtual',
      availability: [],
    });
  };

  const handleAvailabilityChange = (day: string) => {
    setNewListing(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking request to your backend
    console.log('Booking request:', selectedService);
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-purple-900 mb-2">PregNet Marketplace</h1>
          <p className="text-purple-600">Buy, sell, and connect with other mothers in your community</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            List Item or Service
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'products'
              ? 'bg-purple-600 text-white'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'services'
              ? 'bg-purple-600 text-white'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
        >
          Services
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === category.id
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'products'
          ? products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-semibold">${product.price}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="ml-1 text-sm">{product.seller.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <img
                      src={`https://ui-avatars.com/api/?name=${product.seller.name}`}
                      alt={product.seller.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="ml-2 text-sm text-gray-600">{product.seller.name}</span>
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Trust Score: {product.seller.trustScore}%
                    </span>
                    <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                      {product.seller.empowermentPoints} crowns
                    </span>
                  </div>
                </div>
              </div>
            ))
          : services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                    {service.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-600 font-semibold">${service.price}/hr</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-sm">{service.seller.rating}</span>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${service.seller.name}`}
                    alt={service.seller.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="ml-2 text-sm text-gray-600">{service.seller.name}</span>
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Trust Score: {service.seller.trustScore}%
                  </span>
                  <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                    {service.seller.empowermentPoints} crowns
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Available: {service.availability.join(', ')}</span>
                </div>
                <button
                  onClick={() => handleBookService(service)}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            ))}
      </div>

      {/* Listing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-900">List New Item or Service</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setListingType('product')}
                className={`flex-1 px-4 py-2 rounded-md ${
                  listingType === 'product'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                Product
              </button>
              <button
                onClick={() => setListingType('service')}
                className={`flex-1 px-4 py-2 rounded-md ${
                  listingType === 'service'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                Service
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newListing.name}
                  onChange={(e) => setNewListing({ ...newListing, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newListing.description}
                  onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={newListing.price}
                    onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newListing.category}
                  onChange={(e) => setNewListing({ ...newListing, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.filter(c => c.id !== 'all').map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {listingType === 'service' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Type
                    </label>
                    <select
                      value={newListing.type}
                      onChange={(e) => setNewListing({ ...newListing, type: e.target.value as 'virtual' | 'local' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="virtual">Virtual</option>
                      <option value="local">Local</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleAvailabilityChange(day)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            newListing.availability.includes(day)
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  List {listingType === 'product' ? 'Product' : 'Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-900">Book Service</h2>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <input
                  type="text"
                  value={selectedService.name}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provider
                </label>
                <input
                  type="text"
                  value={selectedService.seller.name}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="Add any specific requirements or questions..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace; 