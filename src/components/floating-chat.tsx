// FloatingChatIcon.tsx
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react'; // Or any icon library

const FloatingChatIcon: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    // Here you can call your chat script or open a chat window/modal
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition"
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-xl p-4">
          {/* Place your chat script/component here */}
          <div>Chat window goes here</div>
        </div>
      )}
    </>
  );
};

export default FloatingChatIcon;