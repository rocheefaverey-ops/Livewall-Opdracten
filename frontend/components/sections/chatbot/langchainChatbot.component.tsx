import React, { useState, useEffect, useRef } from 'react';
import TypingAnimation from '../../ui/typingAnimation.component';
import { Aart, Chat } from './images';

type ChatEntry = {
  message: string;
  type: string;
  time: number;
};

const LangchainChatbot = () => {
  const [query, setQuery] = useState('');
  const [chatLog, setChatLog] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeChatLog();
  }, []);

  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup', {
        method: 'POST'
      });
      const json = await result.json();
      console.log('result: ', json);
    } catch (err) {
      console.log('err:', err);
    }
  }

  const initializeChatLog = () => {
    const initialMessages: ChatEntry[] = [
      {
        message: 'Hallo! Mijn naam is Aart. Hoe kan ik je helpen met vragen betreffende onze onderneming?',
        type: 'bot',
        time: Date.now() // Add the current timestamp
      }
    ];
    setChatLog(initialMessages);
  };

  const messageClasses: {
    [key: string]: string;
  } = {
    user: 'text-white bg-[#333333] font-regular ml-[30vw] md:ml-[20px]',
    bot: 'text-black-600 bg-[#f7f4f4] mr-[30vw] md:mr-[20px]'
  };

  const sendQuery = async (manual_input: string | null | undefined = null) => {
    let used_query;
    if (manual_input !== null) {
      used_query = manual_input;
    } else {
      if (!query) {
        return;
      } else {
        used_query = query;
      }
    }

    const time = Date.now(); // Timestamp for the user message
    const userMessageEntry: ChatEntry = {
      message: used_query,
      type: 'user',
      time
    };
    setChatLog((prevLog) => [...prevLog, userMessageEntry]); // Add user message to chat log immediately
    setQuery(''); // Clear the input field

    setLoading(true); // Start loading animation

    try {
      const defaultContext =
        'Je bent een vriendelijke AI-assistent die de website bezoeker helpt met informatie betreffende Aartsen. Aartsen is het bedrijf waar je voor werkt. Je krijgt alle kennis die je nodig hebt via een database. Als de gebruiker vraagt naar contact of contact informatie geef je altijd het telefoonnummer en e-mail. Als de informatie die je zoekt daar niet instaat vermeld je aan de gebruiker dat deze informatie helaas niet ter beschikking is. Als iemand een bedankje stuurt zeg je netjes graag gedaan. Bij vraag naar onze certificering geef je altijd het bio certificaat nummer';
      const conversationContext = chatLog.map((entry) => entry.message).join(' ');
      const requestData = {
        context: conversationContext,
        defaultContext,
        used_query
      };

      const response = await fetch('/api/read', {
        method: 'POST',
        body: JSON.stringify(requestData)
      });
      const json = await response.json();

      updateChatLog(used_query, json.data);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateChatLog = (userMessage: string, botMessage: string) => {
    const time = Date.now(); // Renamed timestamp to time
    setChatLog((prevLog) => [
      ...prevLog,
      { message: botMessage, type: 'bot', time } // Updated to use 'time' property
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendQuery();
    }
  };

  const toggleChatbot = () => {
    setShowChatbot((prevShowChatbot) => !prevShowChatbot);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  const handleSuggestionClick = (text: string, identifier: string) => {
    let suggestionText = '';

    switch (identifier) {
      case 'contact':
        suggestionText = 'Hoe kan ik julie bereiken?';
        break;
      case 'certification':
        suggestionText = 'Hoe steekt jullie certificering in elkaar? En wat is het certificaat nummer?';
        break;
      case 'services':
        suggestionText = 'Wat voor diensten verstrekken jullie?';
        break;
      default:
        break;
    }

    sendQueryWithText(suggestionText);
  };

  const sendQueryWithText = (suggestionText: string) => {
    sendQuery(suggestionText);
  };

  const scrollToBottom = () => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  return (
    <div style={{ position: 'relative' }}>
      {!showChatbot && (
        <button className="fixed p-2 z-50 right-4 bottom-4 bg-[#000000] text-white rounded-full cursor-pointer hover:bg-primary" onClick={toggleChatbot}>
          <Chat />
        </button>
      )}

      {showChatbot && (
        <div className="fixed md:right-4 md:bottom-4 right-0 bottom-0 md:max-w-[500px] md:max-h-[600px] lg:max-h-[600px] lg:max-w-[400px] w-full h-full bg-white z-50 flex flex-col rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="py-2 flex flex-row justify-between px-4 border-b-2">
            <div></div>
            <div className="flex text-center flex-col">
              <h1 className="font-bold text-lg">Aart</h1>
              <p>AI-assistent</p>
            </div>
            <button className="border-none cursor-pointer text-[50px] leading-none" onClick={closeChatbot}>
              -
            </button>
          </div>
          <div className="chat-log px-2" style={{ flex: '1', overflowY: 'auto' }} ref={chatLogRef}>
            {chatLog.map((entry, index) => (
              <div key={index} className={`flex justify-${entry.type === 'user' ? 'end' : 'start'} my-2`}>
                {entry.type === 'bot' && (
                  <div className="profile-pic mr-2">
                    <Aart />
                  </div>
                )}
                <div
                  className={`${messageClasses[entry.type]} rounded-md px-2 py-1 max-w-[70%] text-${
                    entry.type === 'user' ? 'right bg-black' : 'left bg-[#f7f4f4]'
                  }`}
                >
                  <span className="font-bold">{entry.type === 'user' ? 'Jij' : 'Aart '}</span>
                  <br />
                  {entry.message}
                  <div className="flex justify-end">
                    <h1 className="opacity-50">
                      {entry.time &&
                        new Date(entry.time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false // To force 24-hour time format
                        })}
                    </h1>
                  </div>  
                </div>
              </div>
            ))}

            {loading && <TypingAnimation />}
          </div>
          <div className="suggestions flex flex-row justify-start px-2 py-1 gap-2 overflow-x-scroll md:overflow-hidden">
            <div
              className="border-black border-[0.5px] hover:bg-black hover:text-white px-2 leading-10 rounded-full hover:cursor-pointer"
              onClick={() => handleSuggestionClick('Contact', 'contact')}
            >
              Contact
            </div>
            <div
              className="border-black border-[0.5px] hover:bg-black hover:text-white px-2 leading-10 rounded-full hover:cursor-pointer"
              onClick={() => handleSuggestionClick('Certification', 'certification')}
            >
              Certificering
            </div>
            <div
              className="border-black border-[0.5px] hover:bg-black hover:text-white px-2 leading-10 rounded-full hover:cursor-pointer"
              onClick={() => handleSuggestionClick('Diensten', 'services')}
            >
              Diensten
            </div>
          </div>
          <div className="flex flex-row justify-between w-full gap-[10px] p-2">
            <input
              className="text-black border border-gray-300 rounded-full outline-none leading-tight flex px-2 w-full"
              placeholder="Je vraag of stelling..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={handleKeyPress}
            />
            <button
              className="px-7 py-1 rounded-full bg-[#CB2F1D] border-[#CB2F1D] border-[1px] text-white transition duration-300 ease-in-out hover:bg-[#D14838] hover:border-[#D14838]"
              onClick={() => sendQuery()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LangchainChatbot;
