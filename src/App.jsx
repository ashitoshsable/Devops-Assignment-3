import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import { FaSquareXTwitter, FaLinkedin } from 'react-icons/fa6';
import { FaGithubSquare } from "react-icons/fa";
import { MdMailOutline } from 'react-icons/md';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      text: input,
      isPerson1: true,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const conversationHistory = newMessages.map(msg => (msg.isPerson1 ? 'User: ' : 'Answer: ') + msg.text).join('\n');

    setGeneratingAnswer(true);
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: 'post',
        data: {
          contents: [{ parts: [{ text: conversationHistory + " Don't add any prefixes like agent: , assistant: , etc to your response just give response that's it" }] }],
        },
      });

      console.log(response);

      let responseText = response.data.candidates[0].content.parts[0].text;
      console.log(responseText);


      const llmMessage = {
        text: responseText,
        isPerson1: false,
      };

      setMessages((prevMessages) => [...prevMessages, llmMessage]);
    } catch (error) {
      console.log(error);
      const errorMessage = {
        text: 'Sorry - Something went wrong. Please try again!',
        isPerson1: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
    setGeneratingAnswer(false);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleFocus = () => {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    inputRef.current.addEventListener('focus', handleFocus);
    return () => {
      inputRef.current.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <div className="bg-gray-900 h-screen p-4 flex flex-col items-center relative font-sans">
      <header className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center text-white">
          <img src="/logo.png" alt="Logo" className="h-6 mr-2" />
          <span className="text-2xl font-bold">Dime</span>
        </div>
        <div className="connect-section">
          <a href="https://twitter.com/ashitosh_png" target="_blank" rel="noopener noreferrer" className="mr-2">
            <FaSquareXTwitter size={24} />
          </a>
          <a href="mailto:ashitoshsable09@gmail.com" className="mr-2">
            <MdMailOutline size={24} />
          </a>
          <a href="https://www.linkedin.com/in/ashitosh-madhukar-sable/" target="_blank" rel="noopener noreferrer" className="mr-2">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/ashitoshsable" target="_blank" rel="noopener noreferrer" className="mr-2">
            <FaGithubSquare size={24} />
          </a>
        </div>
      </header>
      <div className="w-full md:w-2/3 lg:w-3/5 xl:w-3/5 flex-1 overflow-auto mb-4 p-4 rounded">
        {messages.length === 0 && (
          <div className="text-left text-white mt-16">
            <p className="text-4xl mb-4 font-bold mb-0 pb-0">You are anonymous here</p>
            <p className="text-xl font-bold text-blue-500">Nothing gets saved here</p>
          </div>
        )}
        {messages.map((message, index) => (
          <Message key={index} text={message.text} isPerson1={message.isPerson1} />
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="w-full md:w-2/3 lg:w-3/5 xl:w-3/5 flex" ref={inputRef}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow m-1 rounded-lg text-slate-100 bg-slate-700 border-0 p-3 transition-all duration-300 focus:outline-none"
          placeholder="Ask me anything about money..."
          disabled={generatingAnswer}
        />
        <button
          onClick={handleSend}
          className={`bg-blue-600 m-1 text-white p-3 rounded-md hover:bg-blue-700 transition-all duration-300 ${
            generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={generatingAnswer}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
