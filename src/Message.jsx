import React from 'react';
import ReactMarkdown from 'react-markdown';

const Message = ({ text, isPerson1 }) => {
  return (
    <div className={`mb-2 flex ${isPerson1 ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-2 rounded max-w-4/5 ${
          isPerson1 ? 'bg-slate-800 text-slate-400' : 'bg-blue-500 text-white'
        }`}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
