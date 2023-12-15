import type { NextPage } from 'next';
import { withPageLayoutData } from '@utils/index';
import LangchainChatbot from '../components/sections/chatbot/langchainChatbot.component';

const Home: NextPage = () => {
  return (
    <div>
      <LangchainChatbot/>
      Hallo
    </div>
  );
};

export default Home;
