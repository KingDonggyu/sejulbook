import { useEffect, useState } from 'react';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileRegex = [
      /Android/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    const agent = window.navigator.userAgent;
    setIsMobile(mobileRegex.some((regex) => agent.match(regex)));
  }, []);

  return isMobile;
};

export default useMobile;
