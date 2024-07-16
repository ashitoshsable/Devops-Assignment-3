import React from 'react';
import ReactMarkdown from 'react-markdown';

const Message = ({ text, isPerson1 }) => {
  return (
    <div className={`mb-2 ${isPerson1 ? 'text-right' : 'text-left'}`}>
      <div
        className={`inline-block p-2 rounded ${
          isPerson1 ? 'bg-slate-800 text-slate-400' : 'bg-blue-500 text-white'
        }`}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
