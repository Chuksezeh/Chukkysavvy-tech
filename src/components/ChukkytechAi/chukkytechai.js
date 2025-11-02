import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './chukkytechai.css';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { chukkytechAxios } from '../Utility/axios';

const API_BASE = 'http://localhost:5000/api';

const ChukkytechAi = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm ChukkyAI, your tech support assistant. I can help you with device repairs, gadget prices, technical advice, and more. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'welcome'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const sidebarRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          !event.target.closest('.sidebar-toggle-btn')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const sendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chukkytechAxios.post('ai/chat', {
        message: messageText,
        
      });

      const aiMessage = {
        text: response.data.response,
        sender: 'ai',
        timestamp: new Date(),
        type: response.data.type
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        text: "I'm having connection issues. Please try again or contact us directly at +234-XXX-XXXX for immediate assistance.",
        sender: 'ai',
        timestamp: new Date(),
        type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    const actions = {
      'repair': {
        message: "I need repair services for my device",
        icon: '🛠️'
      },
      'prices': {
        message: "What are your repair prices and gadget costs?",
        icon: '💰'
      },
      'buy': {
        message: "I want to buy a new or used gadget",
        icon: '🛒'
      },
      'location': {
        message: "Where is your shop located and what are your hours?",
        icon: '📍'
      },
      'advice': {
        message: "I need technical advice for my device",
        icon: '💡'
      },
      'water_damage': {
        message: "My device has water damage, what should I do?",
        icon: '💧'
      },
      'battery': {
        message: "My battery drains quickly, can you help?",
        icon: '🔋'
      },
      'slow_device': {
        message: "My device is running slow, any solutions?",
        icon: '🐢'
      }
    };

    if (actions[action]) {
      sendMessage(actions[action].message);
      // Close sidebar on mobile after selection
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        text: "Hello! I'm ChukkyAI, your tech support assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date(),
        type: 'welcome'
      }
    ]);
  };

  const suggestedQuestions = [
    "How much for iPhone screen repair?",
    "Best laptop under ₦200,000?",
    "My phone won't turn on",
    "Do you fix water damaged devices?",
    "Warranty on repairs?"
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header />
      
      <div className="chukkytech-ai-container">
        <main className="main-cont">
          <div className="ai-interface">
            <div className="ai-main-container">
              {/* Quick Actions Sidebar */}
              <div 
                ref={sidebarRef}
                className={`quick-actions-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}
              >
                <div className="sidebar-header">
                  <h3>Quick Help</h3>
                  <button 
                    className="sidebar-close-btn"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Close sidebar"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                
                <div className="sidebar-content">
                  <div className="action-categories">
                    <div className="category">
                      <h4>🛠️ Repairs</h4>
                      <button onClick={() => handleQuickAction('repair')} className="action-btn">
                        Device Repair
                      </button>
                      <button onClick={() => handleQuickAction('water_damage')} className="action-btn">
                        Water Damage
                      </button>
                      <button onClick={() => handleQuickAction('battery')} className="action-btn">
                        Battery Issues
                      </button>
                    </div>
                    
                    <div className="category">
                      <h4>💰 Pricing</h4>
                      <button onClick={() => handleQuickAction('prices')} className="action-btn">
                        Check Prices
                      </button>
                      <button onClick={() => handleQuickAction('buy')} className="action-btn">
                        Buy Gadgets
                      </button>
                    </div>
                    
                    <div className="category">
                      <h4>💡 Support</h4>
                      <button onClick={() => handleQuickAction('advice')} className="action-btn">
                        Get Advice
                      </button>
                      <button onClick={() => handleQuickAction('location')} className="action-btn">
                        Find Store
                      </button>
                    </div>
                  </div>

                  {/* Suggested Questions */}
                  <div className="suggested-questions">
                    <h4>Common Questions</h4>
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        className="suggestion-chip"
                        onClick={() => {
                          sendMessage(question);
                          if (window.innerWidth <= 768) {
                            setIsSidebarOpen(false);
                          }
                        }}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>






              {/* Chat Container */}
              <div className="chat-container-wrapper">
               
                <div className="chat-container">
                  <div className="chat-header">
                    <div className="chat-header-left">
                      {/* Mobile Toggle Button - Only show on mobile */}
                      <button 
                        className="sidebar-toggle-btn"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                      >
                        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
                      </button>
                      
                      <div className="chat-header-info">
                        <div className="ai-avatar">
                          <i className="fas fa-robot"></i>
                        </div>
                        <div>
                          <h3 className='ai_HeadAssit'>ChukkyAI Assistant</h3>
                          <span className="status online">Online</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="chat-controls">
                      <button onClick={clearChat} className="control-btn" title="Clear Chat">
                        <i className="fas fa-trash"></i>
                      </button>
                      <button 
                        onClick={() => setIsMinimized(!isMinimized)} 
                        className="control-btn"
                        title={isMinimized ? "Maximize" : "Minimize"}
                      >
                        <i className={`fas fa-${isMinimized ? 'expand' : 'compress'}`}></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className={`chat-messages ${isMinimized ? 'minimized' : ''}`}>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'} ${message.type || ''}`}
                      >
                        {message.sender === 'ai' && (
                          <div className="message-avatar">
                            <i className="fas fa-robot"></i>
                          </div>
                        )}
                        <div className="message-content">
                          <div className="message-text">{message.text}</div>
                          <div className="message-time">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        {message.sender === 'user' && (
                          <div className="message-avatar user">
                            <i className="fas fa-user"></i>
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="message ai-message loading">
                        <div className="message-avatar">
                          <i className="fas fa-robot"></i>
                        </div>
                        <div className="message-content">
                          <div className="typing-indicator">
                            <span>ChukkyAI is typing </span>
                            <div className="typing-dots">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="chat-input-container">
                    {/* <div className="input-actions">
                      <button className="action-icon" title="Attach file">
                        <i className="fas fa-paperclip"></i>
                      </button>
                      <button className="action-icon" title="Send location">
                        <i className="fas fa-map-marker-alt"></i>
                      </button>
                    </div> */}
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask about repairs, prices, or tech advice..."
                      disabled={isLoading}
                      className="chat-input"
                    />
                    <button 
                      onClick={() => sendMessage()} 
                      disabled={isLoading || !inputMessage.trim()}
                      className="send-button"
                    >
                      {isLoading ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fas fa-paper-plane"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ChukkytechAi;