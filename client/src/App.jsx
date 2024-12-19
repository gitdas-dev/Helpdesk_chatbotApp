import React from 'react';
import './App.css';
import Chat from './components/Chat';
import LandingPage from './components/LandingPage';
import { ThemeProvider } from './context/ThemeContext';
import { useState } from 'react';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => {
    setIsChatOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <ThemeProvider>
      <div className="App">
        <LandingPage onChatOpen={handleChatOpen} />
        {isChatOpen && (
          <div className="chat-overlay">
            <button 
              className="close-chat" 
              onClick={handleChatClose}
              aria-label="Close chat"
            >
              ✕
            </button>
            <Chat />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;