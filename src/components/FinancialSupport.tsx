import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { DollarSign, AlertCircle, FileQuestion } from 'lucide-react';

const FinancialSupport: React.FC = () => {
  const { financialRequests, submitFinancialRequest, currentUser } = useAppContext();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFinancialRequest(parseFloat(amount), reason, urgency);
    setShowRequestForm(false);
    setAmount('');
    setReason('');
    setUrgency('medium');
  };

  // Get user's requests
  const userRequests = financialRequests.filter(req => req.userId === currentUser.id);
  
  // Example supported funds (would come from API in real app)
  const fundStats = {
    totalAvailable: 15000,
    totalAllocated: 8750,
    numRequests: 23,
    numFulfilled: 18,
    avgFulfillment: 92, // percentage
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-900 flex items-center">
            <DollarSign className="h-6 w-6 text-purple-600 mr-2" />
            Financial Support Network
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
          Our community support fund helps pregnant and postpartum parents with financial needs.
          Funds are allocated based on urgency and impact, ensuring fair distribution.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-5">
            <h3 className="font-semibold text-purple-900 mb-3">Support Fund Statistics</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-700">Total Available</span>
                  <span className="font-medium text-purple-900">${fundStats.totalAvailable.toLocaleString()}</span>
                </div>
                
                <div className="mt-1 h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500"
                    style={{ width: `${(fundStats.totalAllocated / fundStats.totalAvailable) * 100}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-purple-600 mt-1">
                  <span>${fundStats.totalAllocated.toLocaleString()} allocated</span>
                  <span>${(fundStats.totalAvailable - fundStats.totalAllocated).toLocaleString()} remaining</span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">Requests Fulfilled</span>
                <span className="font-medium text-purple-900">
                  {fundStats.numFulfilled} of {fundStats.numRequests} ({Math.round((fundStats.numFulfilled / fundStats.numRequests) * 100)}%)
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">Average Fulfillment</span>
                <span className="font-medium text-purple-900">{fundStats.avgFulfillment}% of requested amount</span>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-5">
            <h3 className="font-semibold text-purple-900 mb-3">Your Support Requests</h3>
            
            {userRequests.length > 0 ? (
              <div className="space-y-3">
                {userRequests.map((request) => (
                  <div key={request.id} className="bg-white p-3 rounded-md shadow-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-purple-900">${request.amount.toLocaleString()}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        request.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        request.status === 'fulfilled' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-purple-700 mb-1">{request.reason}</p>
                    
                    <div className="flex justify-between text-xs">
                      <span className={`${
                        request.urgency === 'high' ? 'text-red-600' : 
                        request.urgency === 'medium' ? 'text-orange-600' : 
                        'text-blue-600'
                      }`}>
                        {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} urgency
                      </span>
                      
                      {request.allocated && (
                        <span className="text-green-600">
                          ${request.allocated.toLocaleString()} allocated
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-purple-600">You haven't made any support requests yet.</p>
            )}
            
            <div className="mt-4">
              {!showRequestForm ? (
                <button
                  onClick={() => setShowRequestForm(true)}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none transition-colors duration-200"
                >
                  Request Support
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-purple-700 mb-1">
                      Amount Needed ($)
                    </label>
                    <input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter amount"
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-purple-700 mb-1">
                      Reason
                    </label>
                    <textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                      placeholder="Briefly explain what the funds will be used for"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">
                      Urgency Level
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setUrgency('low')}
                        className={`flex-1 px-2 py-1.5 rounded-md border text-sm transition-colors duration-200 ${
                          urgency === 'low' 
                            ? 'bg-blue-100 border-blue-300 text-blue-800' 
                            : 'bg-white border-purple-200 text-purple-600 hover:border-purple-400'
                        }`}
                      >
                        Low
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency('medium')}
                        className={`flex-1 px-2 py-1.5 rounded-md border text-sm transition-colors duration-200 ${
                          urgency === 'medium' 
                            ? 'bg-orange-100 border-orange-300 text-orange-800' 
                            : 'bg-white border-purple-200 text-purple-600 hover:border-purple-400'
                        }`}
                      >
                        Medium
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency('high')}
                        className={`flex-1 px-2 py-1.5 rounded-md border text-sm transition-colors duration-200 ${
                          urgency === 'high' 
                            ? 'bg-red-100 border-red-300 text-red-800' 
                            : 'bg-white border-purple-200 text-purple-600 hover:border-purple-400'
                        }`}
                      >
                        High
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none transition-colors duration-200"
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRequestForm(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Confidentiality Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  All financial support requests are kept strictly confidential. Only the allocation committee
                  will see your request details, and funds are distributed discreetly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-purple-900 mb-4">How Financial Support Works</h3>
            
            <div className="space-y-4 text-sm text-purple-800">
              <p>
                <span className="font-semibold">Matching Algorithm:</span> Our system uses an ethical matching algorithm 
                that prioritizes the most urgent needs while ensuring everyone receives support.
              </p>
              
              <p>
                <span className="font-semibold">Fair Distribution:</span> Unlike traditional first-come-first-served models, 
                our algorithm considers multiple factors:
              </p>
              
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Urgency of need</li>
                <li>Potential impact of support</li>
                <li>Equitable distribution across all requesters</li>
              </ul>
              
              <p>
                <span className="font-semibold">Nash Equilibrium:</span> The system is designed to reach a fair 
                distribution where no individual would benefit from misrepresenting their needs, creating 
                an incentive for honest reporting.
              </p>
              
              <p>
                <span className="font-semibold">Dignity Preservation:</span> Basic needs are never subject to 
                competition. Only non-essential support uses reputation-based allocation.
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

export default FinancialSupport;