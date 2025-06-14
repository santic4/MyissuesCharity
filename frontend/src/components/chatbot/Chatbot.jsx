import { useEffect, useRef, useState } from "react"
import { VITE_API_URL } from "../../config/config";
import '../../styles/chatbot/chatbot.css';

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const greeting = "Hello, you can type a question or select one of the options:";
  const initialOptions = ["How to donate?"];

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    setError(null);
    // On opening, if no messages, show greeting
    if (!isOpen && messages.length === 0) {
      setMessages([{ sender: 'bot', text: greeting, isOptionPrompt: true }]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const sendQuery = async (text) => {
    if (!text.trim()) return;
    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${VITE_API_URL}/api/chatbot/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ query: text }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      const botMsg = { sender: 'bot', text: data.reply || 'No response' };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setError('There was an error sending the message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendQuery(query);
      setQuery('');
    }
  };

  const handleOptionClick = (option) => {
    sendQuery(option);
  };

  return (
    <>
      <div className="chatbotBubble" onClick={toggleChat}>
        💬
      </div>
      {isOpen && (
        <div className="chatbotWindow">
          <div className="chatbotHeader">
            <span>Chatbot</span>
            <button className="chatbotCloseButton" onClick={toggleChat}>×</button>
          </div>
          <div className="chatbotBody">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.sender === 'user' ? 'chatbotMessageUser' : 'chatbotMessageBot'}>
                {msg.text}
                {msg.isOptionPrompt && (
                  <div className="chatbotOptions">
                    {initialOptions.map((opt, i) => (
                      <button key={i} className="chatbotOptionButton" onClick={() => handleOptionClick(opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbotFooter">
            <input
              className="chatbotInput"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write your message..."
              disabled={isLoading}
            />
            <button
              className="chatbotSendButton"
              onClick={() => { sendQuery(query); setQuery(''); }}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
          {error && <div className="chatbotError">{error}</div>}
        </div>
      )}
    </>
  );
};

export default Chatbot;