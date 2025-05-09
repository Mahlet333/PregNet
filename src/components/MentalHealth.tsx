import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Heart, Mic, Pause, ChevronDown, ChevronUp, Save } from 'lucide-react';

const MentalHealth: React.FC = () => {
  const { voiceJournals, addVoiceJournal } = useAppContext();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const [expandedJournal, setExpandedJournal] = useState<string | null>(null);
  const [simulatedEmotion, setSimulatedEmotion] = useState<'positive' | 'neutral' | 'negative'>('neutral');

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const interval = setInterval(() => {
      setRecordingTime(prevTime => prevTime + 1);
    }, 1000);
    setRecordingInterval(interval);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    
    // Simulate analyzing the voice and adding a journal entry
    addVoiceJournal(simulatedEmotion);
  };

  const toggleJournalExpansion = (journalId: string) => {
    setExpandedJournal(expandedJournal === journalId ? null : journalId);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'neutral':
        return 'bg-blue-100 text-blue-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'neutral':
        return '😐';
      case 'negative':
        return '😔';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-purple-900 mb-2 flex items-center">
          <Heart className="h-6 w-6 text-pink-500 mr-2" />
          Mental Health Support
        </h2>
        
        <p className="text-sm text-purple-700 mb-6">
          Record voice check-ins to track your emotional wellbeing. Our system analyzes emotional content
          and provides personalized support.
        </p>
        
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">Voice Check-In</h3>
          
          <p className="text-sm text-purple-700 mb-4">
            Talk about how you're feeling today. This is a safe space to express yourself.
            The AI will analyze your voice to detect emotions and offer support.
          </p>
          
          {!isRecording ? (
            <div>
              <p className="text-xs text-purple-600 mb-3">
                For this demo, please select how you're feeling:
              </p>
              
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setSimulatedEmotion('positive')}
                  className={`flex-1 px-4 py-2 rounded-md border transition-colors duration-200 flex items-center justify-center ${
                    simulatedEmotion === 'positive' 
                      ? 'bg-green-100 border-green-300 text-green-800' 
                      : 'bg-white border-purple-200 text-purple-600 hover:border-purple-400'
                  }`}
                >
                  <span className="mr-2">😊</span>
                  Positive
                </button>
                
                <button
                  onClick={() => setSimulatedEmotion('neutral')}
                  className={`flex-1 px-4 py-2 rounded-md border transition-colors duration-200 flex items-center justify-center ${
                    simulatedEmotion === 'neutral' 
                      ? 'bg-blue-100 border-blue-300 text-blue-800' 
                      : 'bg-white border-purple-200 text-purple-600 hover:border-purple-400'
                  }`}
                >
                  <span className="mr-2">😐</span>
                  Neutral
                </button>
                
                <button
                  onClick={() => setSimulatedEmotion('negative')}
                  className={`flex-1 px-4 py-2 rounded-md border transition-colors duration-200 flex items-center justify-center ${
                    simulatedEmotion === 'negative' 
                      ? 'bg-red-100 border-red-300 text-red-800' 
                      : 'bg-white border-purple-200 text-purple-600 hover:border-purple-400'
                  }`}
                >
                  <span className="mr-2">😔</span>
                  Struggling
                </button>
              </div>
              
              <button
                onClick={startRecording}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none transition-colors duration-200 flex items-center justify-center"
              >
                <Mic className="h-5 w-5 mr-2" />
                Start Voice Check-In
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-30"></div>
                <div className="w-28 h-28 bg-purple-100 rounded-full flex items-center justify-center z-10">
                  <div className="text-xl font-medium text-purple-900">
                    {formatTime(recordingTime)}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-purple-700 mb-4">
                Recording... Speak naturally about how you're feeling today.
              </p>
              
              <button
                onClick={stopRecording}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none transition-colors duration-200 flex items-center mx-auto"
              >
                <Pause className="h-5 w-5 mr-2" />
                Stop Recording
              </button>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-purple-900 mb-3">Your Voice Journal</h3>
          
          {voiceJournals.length > 0 ? (
            <div className="space-y-4">
              {voiceJournals.map((journal) => (
                <div 
                  key={journal.id} 
                  className="border border-purple-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-purple-300"
                >
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleJournalExpansion(journal.id)}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{getSentimentEmoji(journal.sentiment)}</span>
                      <div>
                        <div className="font-medium text-purple-900">
                          {new Date(journal.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getSentimentColor(journal.sentiment)}`}>
                          {journal.sentiment.charAt(0).toUpperCase() + journal.sentiment.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <button className="text-purple-600 hover:text-purple-800">
                      {expandedJournal === journal.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {expandedJournal === journal.id && (
                    <div className="p-4 pt-0 border-t border-purple-100">
                      <div className="bg-purple-50 p-4 rounded-lg mb-4">
                        <h4 className="text-sm font-medium text-purple-900 mb-2">Voice Analysis:</h4>
                        <p className="text-sm text-purple-700">{journal.analysis}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-purple-900 mb-2">Recommendations:</h4>
                        <ul className="list-disc list-inside text-sm text-purple-700 space-y-1">
                          {journal.recommendations.map((recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <button className="text-purple-600 hover:text-purple-800 text-sm flex items-center">
                          <Save className="h-4 w-4 mr-1" />
                          Save to Journal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-purple-600 bg-purple-50 rounded-lg">
              <Heart className="h-12 w-12 mx-auto mb-3 text-purple-400" />
              <p>No voice journals yet. Start by recording your first voice check-in!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;