const checkIsMobile = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  const agent = window.navigator.userAgent;
  const isMobile = mobileRegex.some((regex) => agent.match(regex));

  return isMobile;
};

export default checkIsMobile;
