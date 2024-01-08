const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-2 px-[10px]">
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-[#CB2F1D] animate-pulse"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-[#CB2F1D] animate-pulse delay-75"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-[#CB2F1D] animate-pulse delay-150"></div>
    </div>
  );
};

export default TypingAnimation;
