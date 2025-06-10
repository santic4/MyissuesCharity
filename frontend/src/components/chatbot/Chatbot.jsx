import React, { useState } from 'react';
import { VITE_API_URL } from '../../config/config';

const Chatbot =  () => {
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('');

  const send = async ()=>{

    const res = await fetch(`${VITE_API_URL}/api/chatbot/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ query })
    });
        
    if(!res.ok) throw new Error('Error in chatbot response.')

    const response = await res.json();

    setReply(response.reply);
  };

  return (
    <div className="p-4">
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask me... for example, how to donate?" />
      <button onClick={send}>Send</button>
      <p>{reply}</p>
    </div>
  );
}

export default Chatbot;