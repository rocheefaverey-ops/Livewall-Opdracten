const TypingAnimation = () => {
  return (
    <div className=" ml-7 flex items-center space-x-2 px-[10px] bg-[#f7f4f4] justify-around py-1 rounded-md max-w-[125px]">
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-[#CB2F1D] animate-pulse"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-[#CB2F1D] animate-pulse delay-75"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-[#CB2F1D] animate-pulse delay-150"></div>
    </div>
  );
};

export default TypingAnimation;
