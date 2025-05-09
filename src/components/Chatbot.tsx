import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { HelpCircle, Send, RefreshCw } from 'lucide-react';

const Chatbot: React.FC = () => {
  const { chatMessages, sendChatMessage } = useAppContext();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendChatMessage(newMessage);
      setNewMessage('');
    }
  };

  const suggestedQuestions = [
    "How does the matching algorithm work for item sharing?",
    "Can you explain how the network visualization helps me?",
    "What's the benefit of earning crowns?",
    "How does the financial support allocation work?",
    "What is a Nash equilibrium and how does it apply here?"
  ];

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <HelpCircle className="h-6 w-6 mr-2" />
            PregNet Assistant
          </h2>
          <p className="text-sm text-purple-100">
            Ask me anything about pregnancy, postpartum care, or how PregNet works!
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-purple-50">
          {chatMessages.length > 0 ? (
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-purple-600 text-white rounded-br-none' 
                        : 'bg-white text-purple-900 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <HelpCircle className="h-12 w-12 text-purple-300 mb-4" />
              <h3 className="text-lg font-medium text-purple-900 mb-2">How can I help you today?</h3>
              <p className="text-sm text-purple-600 mb-6">
                Ask me anything about pregnancy, postpartum care, or how the PregNet platform works!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      sendChatMessage(question);
                    }}
                    className="text-left text-sm bg-white hover:bg-purple-100 transition-colors duration-200 px-3 py-2 rounded-md shadow-sm border border-purple-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-purple-100 p-4 bg-white">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2 border border-purple-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Type your question here..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-r-md shadow-sm hover:bg-purple-700 focus:outline-none transition-colors duration-200 flex items-center"
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          
          {chatMessages.length > 0 && (
            <div className="flex justify-center mt-3">
              <button
                onClick={() => sendChatMessage("Let's start a new conversation")}
                className="text-purple-600 hover:text-purple-800 text-sm flex items-center transition-colors duration-200"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                New conversation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;