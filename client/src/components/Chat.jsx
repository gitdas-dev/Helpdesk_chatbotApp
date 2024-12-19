import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';
import './Chat.css';

axios.defaults.withCredentials = true;

const getOptionsForResponse = (response) => {
  if (response.includes("Would you like to know about our account types?")) {
    return ["Yes, tell me about account types", "No, I have other questions"];
  }
  if (response.includes("Which one interests you?")) {
    return ["Savings Account", "Checking Account", "Student Account", "Business Account"];
  }
  if (response.includes("Required documents")) {
    return ["What's the minimum deposit?", "How long does it take?"];
  }
  if (response.includes("minimum initial deposits")) {
    return ["Tell me about interest rates", "How long to open account?", "What documents do I need?"];
  }
  if (response.includes("interest rates")) {
    return ["How to open an account?", "What's the minimum deposit?", "Tell me about student accounts"];
  }
  if (response.includes("15-20 minutes online")) {
    return ["Start account opening", "Show document requirements", "Tell me about interest rates"];
  }
  if (response.includes("Savings Account") || response.includes("Checking Account") || 
      response.includes("Student Account") || response.includes("Business Account")) {
    return ["What's the minimum deposit?", "Show interest rates", "What documents do I need?"];
  }
  if (response.includes("Hello!")) {
    return ["How to open an account?", "Show account types", "What are the requirements?"];
  }
  if (response) {
    return [
      "Tell me about account types",
      "What are the requirements?",
      "Show interest rates",
      "How long does it take?"
    ];
  }
  return [];
};

function Chat() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const response = await axios.get('/api/chat/history');
      // Reverse the order of messages to show oldest first
      const sortedMessages = response.data
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .map(chat => ({
          message: chat.message,
          response: chat.response,
          timestamp: new Date(chat.timestamp)
        }));
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: userMessage
      });

      // Add bot response
      setMessages(prev => [...prev, {
        message: userMessage,
        response: response.data.response,
        timestamp: new Date()
      }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      setIsClearing(true);
      await axios.delete('/api/chat/history');
      setMessages([]);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    } finally {
      setIsClearing(false);
    }
  };

  const handleOptionClick = async (option) => {
    const userMessage = option;
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: userMessage
      });

      setMessages(prev => [...prev, {
        message: userMessage,
        response: response.data.response,
        timestamp: new Date()
      }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chat-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="chat-header">
        <h2>Bank Account Assistant</h2>
        <div className="header-buttons">
          <button 
            onClick={toggleTheme} 
            className="theme-button"
          >
            {isDarkMode ? '☀' : '🌙'}
          </button>
          <button 
            onClick={clearHistory} 
            disabled={isClearing || messages.length === 0}
            className="clear-button"
          >
            {isClearing ? 'Clearing...' : 'Clear History'}
          </button>
        </div>
      </div>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((msg, index) => (
          <div key={index} className="message-container">
            <div className="user-message">
              <p>{msg.message}</p>
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </div>
            {msg.response && (
              <div className="bot-response-container">
                <div className="bot-message">
                  <p>{msg.response}</p>
                  <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
                {getOptionsForResponse(msg.response) && (
                  <div className="option-buttons">
                    {getOptionsForResponse(msg.response).map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option)}
                        className="option-button"
                        disabled={isLoading}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="typing-indicator">
            Bot is typing
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat; 