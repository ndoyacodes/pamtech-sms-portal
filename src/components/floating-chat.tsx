import React, { useEffect } from 'react';

const FloatingChatIcon: React.FC = () => {
  useEffect(() => {
    if (!document.getElementById('tawkto-script')) {
      const s1 = document.createElement('script');
      s1.id = 'tawkto-script';
      s1.async = true;
      s1.src = 'https://embed.tawk.to/63812001daff0e1306d975bd/1iumblud2';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      document.body.appendChild(s1);
    }
  }, []);

  return null;
};

export default FloatingChatIcon;