import { useEffect, useState } from 'react';
import ClientStorage from '@/lib/ClientStorage';

const useLocalStorage = <T>(key: string, onException?: () => void) => {
  const [clientStorage, setClientStorage] = useState<ClientStorage<T> | null>(
    null,
  );

  useEffect(() => {
    setClientStorage(new ClientStorage<T>(key, localStorage, onException));
  }, [key, onException]);

  return clientStorage;
};

export default useLocalStorage;
