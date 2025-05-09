import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MessageCircle, ThumbsUp, AlertCircle, Send } from 'lucide-react';

const HelpAndAdvice: React.FC = () => {
  const { questions, addQuestion, addAnswer, upvoteQuestion, upvoteAnswer, currentUser } = useAppContext();
  const [newQuestion, setNewQuestion] = useState('');
  const [category, setCategory] = useState('General');
  const [isUrgent, setIsUrgent] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');

  const categories = ['General', 'Pregnancy', 'Breastfeeding', 'Sleep', 'Exercise', 'Nutrition', 'Mental Health'];

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      addQuestion({
        userId: currentUser.id,
        text: newQuestion,
        category,
        isUrgent
      });
      setNewQuestion('');
      setCategory('General');
      setIsUrgent(false);
    }
  };

  const handleSubmitAnswer = (questionId: string) => {
    if (answerText.trim()) {
      addAnswer(questionId, answerText);
      setAnswerText('');
    }
  };

  const toggleQuestionExpansion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
    setAnswerText('');
  };

  // Sort questions: urgent first, then by upvotes, then by date
  const sortedQuestions = [...questions].sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;
    return b.upvotes - a.upvotes || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
          <MessageCircle className="h-6 w-6 text-purple-600 mr-2" />
          Ask a Question
        </h2>
        
        <form onSubmit={handleSubmitQuestion}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-sm font-medium text-purple-700 mb-1">
              Your Question
            </label>
            <textarea
              id="question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              placeholder="What would you like to ask the community?"
              required
            />
          </div>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-purple-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={() => setIsUrgent(!isUrgent)}
                  className="rounded border-purple-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-purple-700 flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                  Mark as Urgent
                </span>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Post Question
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-purple-100">
          <h2 className="text-xl font-bold text-purple-900">
            Community Questions & Answers
          </h2>
          <p className="text-sm text-purple-700">
            Browse questions or help others by answering their questions
          </p>
        </div>
        
        <div className="divide-y divide-purple-100">
          {sortedQuestions.length > 0 ? (
            sortedQuestions.map((question) => (
              <div key={question.id} className="p-6 transition-colors duration-200 hover:bg-purple-50">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => upvoteQuestion(question.id)}
                      className="text-purple-600 hover:text-purple-800 focus:outline-none transition-colors duration-200"
                      title="Upvote this question"
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </button>
                    <span className="text-sm font-medium text-purple-900 mt-1">{question.upvotes}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 
                        className="text-lg font-medium text-purple-900 cursor-pointer hover:text-purple-700"
                        onClick={() => toggleQuestionExpansion(question.id)}
                      >
                        {question.isUrgent && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Urgent
                          </span>
                        )}
                        {question.text}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 text-sm text-purple-600 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {question.category}
                      </span>
                      <span>
                        {new Date(question.createdAt).toLocaleDateString()} at {new Date(question.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    
                    {expandedQuestion === question.id && (
                      <div className="mt-4">
                        <h4 className="text-md font-medium text-purple-900 mb-2">
                          {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
                        </h4>
                        
                        {question.answers.length > 0 ? (
                          <div className="space-y-4 mb-6">
                            {question.answers.map((answer) => (
                              <div key={answer.id} className="bg-purple-50 p-4 rounded-lg">
                                <div className="flex gap-3">
                                  <div className="flex flex-col items-center">
                                    <button
                                      onClick={() => upvoteAnswer(question.id, answer.id)}
                                      className="text-purple-600 hover:text-purple-800 focus:outline-none transition-colors duration-200"
                                      title="Upvote this answer"
                                    >
                                      <ThumbsUp className="h-4 w-4" />
                                    </button>
                                    <span className="text-xs font-medium text-purple-900 mt-1">{answer.upvotes}</span>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm text-purple-900">{answer.text}</p>
                                    <p className="text-xs text-purple-600 mt-1">
                                      {new Date(answer.createdAt).toLocaleDateString()} at {new Date(answer.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-purple-600 mb-4">No answers yet. Be the first to answer!</p>
                        )}
                        
                        <div className="mt-4">
                          <label htmlFor="answer" className="block text-sm font-medium text-purple-700 mb-1">
                            Your Answer
                          </label>
                          <div className="flex">
                            <textarea
                              id="answer"
                              value={answerText}
                              onChange={(e) => setAnswerText(e.target.value)}
                              className="flex-1 px-3 py-2 border border-purple-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              rows={2}
                              placeholder="Share your knowledge or experience..."
                            />
                            <button
                              onClick={() => handleSubmitAnswer(question.id)}
                              className="px-4 py-2 bg-purple-600 text-white rounded-r-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-200 flex items-center"
                              disabled={!answerText.trim()}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Post
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-purple-600">
              No questions yet. Be the first to ask!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpAndAdvice;