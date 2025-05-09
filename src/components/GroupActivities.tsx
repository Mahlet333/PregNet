import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Activity, Calendar, Clock, MapPin, Users, ThumbsUp, Vote, CheckCircle } from 'lucide-react';

const GroupActivities: React.FC = () => {
  const { groupActivities, polls, joinActivity, voteInPoll, currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<'activities' | 'polls'>('activities');
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);

  const handleJoinActivity = (activityId: string) => {
    joinActivity(activityId);
  };

  const handleVote = (pollId: string, optionId: string) => {
    voteInPoll(pollId, optionId);
    setSelectedPoll(null);
  };

  const isUserParticipating = (participants: string[]) => {
    return participants.includes(currentUser.id);
  };

  const hasUserVoted = (poll: any) => {
    // In a real app, this would check if the user has already voted
    // For the demo, we'll just return false to always allow voting
    return false;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="border-b border-purple-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'activities'
                  ? 'border-b-2 border-purple-600 text-purple-900'
                  : 'text-purple-600 hover:text-purple-900 hover:bg-purple-50'
              }`}
            >
              <Activity className="h-5 w-5 mr-2" />
              Group Activities
            </button>
            <button
              onClick={() => setActiveTab('polls')}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'polls'
                  ? 'border-b-2 border-purple-600 text-purple-900'
                  : 'text-purple-600 hover:text-purple-900 hover:bg-purple-50'
              }`}
            >
              <Vote className="h-5 w-5 mr-2" />
              Community Polls
            </button>
          </div>
        </div>

        {activeTab === 'activities' ? (
          <div className="p-6">
            <h2 className="text-xl font-bold text-purple-900 mb-4">Upcoming Group Activities</h2>
            
            <div className="space-y-6">
              {groupActivities.length > 0 ? (
                groupActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="bg-purple-50 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
                  >
                    <h3 className="text-lg font-medium text-purple-900 mb-2">{activity.title}</h3>
                    <p className="text-sm text-purple-700 mb-4">{activity.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-purple-700">
                        <Calendar className="h-4 w-4 text-purple-500 mr-2" />
                        <span>{activity.date}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-purple-700">
                        <Clock className="h-4 w-4 text-purple-500 mr-2" />
                        <span>{activity.time}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-purple-700">
                        <MapPin className="h-4 w-4 text-purple-500 mr-2" />
                        <span>{activity.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-purple-700">
                        <Users className="h-4 w-4 text-purple-500 mr-2" />
                        <span>{activity.participants.length} participants</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-purple-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{activity.votes} votes</span>
                      </div>
                      
                      {isUserParticipating(activity.participants) ? (
                        <div className="flex items-center text-green-600 text-sm font-medium">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          You're attending
                        </div>
                      ) : (
                        <button
                          onClick={() => handleJoinActivity(activity.id)}
                          className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded-md shadow-sm hover:bg-purple-700 focus:outline-none transition-colors duration-200"
                        >
                          Join Activity
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-purple-600">
                  <Activity className="h-12 w-12 mx-auto mb-3 text-purple-400" />
                  <p>No upcoming activities yet. Check back soon!</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-xl font-bold text-purple-900 mb-4">Community Polls</h2>
            <p className="text-sm text-purple-700 mb-6">
              Help make decisions for our community by voting in these polls
            </p>
            
            <div className="space-y-6">
              {polls.length > 0 ? (
                polls.map((poll) => (
                  <div 
                    key={poll.id} 
                    className="bg-purple-50 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
                  >
                    <h3 className="text-lg font-medium text-purple-900 mb-2">{poll.question}</h3>
                    
                    <div className="mb-4">
                      <div className="text-xs text-purple-600 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Ends on {new Date(poll.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {selectedPoll === poll.id || hasUserVoted(poll) ? (
                      <div className="space-y-3">
                        {poll.options.map((option) => {
                          const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
                          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                          
                          return (
                            <div key={option.id} className="relative">
                              <div 
                                className="h-10 bg-purple-200 rounded-md overflow-hidden"
                                title={`${option.votes} votes`}
                              >
                                <div 
                                  className="h-full bg-purple-500 transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              
                              <div className="absolute inset-0 flex items-center justify-between px-3">
                                <span className="text-sm font-medium text-purple-900">
                                  {option.text}
                                </span>
                                <span className="text-sm font-medium text-purple-900">
                                  {percentage}% ({option.votes})
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        
                        <div className="text-right mt-3">
                          <button
                            onClick={() => setSelectedPoll(null)}
                            className="text-purple-600 hover:text-purple-800 text-sm transition-colors duration-200"
                          >
                            Hide results
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="space-y-2 mb-4">
                          {poll.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handleVote(poll.id, option.id)}
                              className="w-full text-left px-4 py-3 rounded-md bg-white border border-purple-200 hover:border-purple-500 transition-colors duration-200 text-sm text-purple-900"
                            >
                              {option.text}
                            </button>
                          ))}
                        </div>
                        
                        <div className="text-right">
                          <button
                            onClick={() => setSelectedPoll(poll.id)}
                            className="text-purple-600 hover:text-purple-800 text-sm transition-colors duration-200"
                          >
                            View results
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-purple-600">
                  <Vote className="h-12 w-12 mx-auto mb-3 text-purple-400" />
                  <p>No active polls at the moment. Check back soon!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupActivities;