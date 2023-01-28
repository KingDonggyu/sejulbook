const debounce = (callback: (...args: unknown[]) => void, delay = 100) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => callback(...args), delay);
  };
};

export default debounce;
