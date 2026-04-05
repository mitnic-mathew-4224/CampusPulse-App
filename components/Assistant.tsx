
import React, { useState, useRef, useEffect } from 'react';
import { POI, ChatMessage, Language } from '../types';
import { getAssistantResponseStream } from '../services/geminiService';
import { renderMarkdown } from '../utils/markdownRenderer';

interface AssistantProps {
  currentPOI: POI;
  onClose: () => void;
  language: Language;
}

const getDefaultQuestions = (poi: POI): string[] => {
  const common = ['What are the working hours?', 'What facilities are available?'];

  const byId: Record<string, string[]> = {
    'dept-ist':          ['Where is the HOD office?', 'Where is the Office Room?', 'How many labs are there?', 'Where is the Knuth Laboratory?'],
    'dept-cse':          ['Where is the HOD office?', 'Where is the Office Room?', 'Where is the Turing Hall?', 'How many labs are there?'],
    'dept-ece':          ['Where is the HOD office?', 'Where is the Department Office?', 'Where is the Maxwell Auditorium?', 'How many labs are there?'],
    'dept-mba':          ['Where is the HOD office?', 'Where is the Chairman office?', 'Where is the ERP Lab?', 'Where is the Conference Hall?'],
    'science-humanities':['Where is the Physics HOD office?', 'Where is the Chemistry HOD office?', 'Where is the English HOD office?', 'What labs are available?'],
    'central-library':   ['What are the borrowing rules?', 'What is the late fee?', 'Where are the reading halls?', 'How do I enter the library?'],
    'rcc':               ['How do I register for WiFi?', 'Where is the help desk?', 'What services does RCC provide?'],
    'swimming-pool':     ['What are the swimming timings?', 'What are the pool rules?', 'Is there a ladies only session?'],
    'ceg-square':        ['Where is Gurunath store?', 'What are Gurunath timings?', 'Is there a canteen here?'],
    'sports-board':      ['How do I get ground usage permission?', 'How do I register for sports events?'],
    'alumni-association':['How do I book the dining hall?', 'What is the dining hall rental cost?', 'Where is the help desk?'],
    'au-gym':            ['Who can access the gym?', 'What equipment is available?'],
    'coe-additional':    ['Where can I get my hall ticket?', 'How do I apply for arrear exam?', 'Where is the help desk?'],
    'estate-office':     ['How do I get event permission?', 'How do I get a vehicle pass?', 'How do I get banner permission?'],
    'college-society':   ['What stationery items are available?', 'Are prices cheaper than outside?'],
  };

  return [...(byId[poi.id] || []), ...common].slice(0, 4);
};

const Assistant: React.FC<AssistantProps> = ({ currentPOI, onClose, language }) => {
  const getGreeting = () => {
    switch(language) {
      case Language.TAMIL:
        return `வணக்கம்! நான் ${currentPOI.name} க்கான உங்கள் வழிகாட்டி. இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?`;
      case Language.HINDI:
        return `नमस्ते! मैं ${currentPOI.name} के लिए आपका मार्गदर्शक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?`;
      default:
        return `Hello! I'm your guide for ${currentPOI.name}. How can I help you today?`;
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: getGreeting(), timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  const handleSend = async (overrideInput?: string) => {
    const query = overrideInput ?? input;
    if (!query.trim() || isLoading) return;
    setShowSuggestions(false);

    const userMsg: ChatMessage = { role: 'user', content: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setStreamingContent('');

    try {
      let fullResponse = '';
      await getAssistantResponseStream(query, currentPOI, language, (chunk) => {
        fullResponse += chunk;
        setStreamingContent(fullResponse);
        setIsLoading(false); // hide dots as soon as first chunk arrives
      });
      // Commit final streamed message to history
      setStreamingContent('');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fullResponse || "I'm sorry, I couldn't process that.",
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Assistant error:', error);
      setStreamingContent('');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      setStreamingContent('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <h2 className="font-bold text-base">Campus Assistant</h2>
            <p className="text-xs opacity-90">🟢 Online • {currentPOI.name}</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="w-10 h-10 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
        >
          <span className="text-xl">✕</span>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
              msg.role === 'user' 
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm' 
              : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
            }`}>
              {msg.role === 'user' ? (
                <p>{msg.content}</p>
              ) : (
                <div className="prose prose-sm max-w-none">{renderMarkdown(msg.content)}</div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-xs text-slate-500">Thinking...</span>
            </div>
          </div>
        )}
        {streamingContent && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-sm text-sm shadow-sm bg-white text-slate-800 border border-slate-200">
              <div className="prose prose-sm max-w-none">{renderMarkdown(streamingContent)}</div>
              <span className="inline-block w-1.5 h-3.5 bg-indigo-500 ml-0.5 animate-pulse rounded-sm" />
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips */}
      {showSuggestions && (
        <div className="px-4 pt-3 pb-1 bg-white flex gap-2 flex-wrap border-t border-slate-100">
          {getDefaultQuestions(currentPOI).map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="text-xs px-3 py-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 active:scale-95 transition-all font-medium disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200 flex gap-2 shadow-lg">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder={`Ask about ${currentPOI.name}...`}
          className="flex-1 bg-slate-100 border-none rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        />
        <button 
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <span className="text-xl">➤</span>
        </button>
      </div>
    </div>
  );
};

export default Assistant;
