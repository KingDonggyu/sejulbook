import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Book } from '@/types/domain/book';
import ClientStorage from '@/lib/ClientStorage';

const STORAGE_KEY = 'SEJULBOOK_NEWBOOK';

interface NewbookContextProps {
  newbook: Book | null;
  setNewbook: (nextNewbook: Book) => void;
  removeNewbook: () => void;
}

const NewbookContext = createContext<NewbookContextProps>({
  newbook: null,
  setNewbook: () => {},
  removeNewbook: () => {},
});

const NewbookProvider = ({ children }: { children: ReactNode }) => {
  const [newbook, setNewbook] = useState<Book | null>(null);
  const [newbookStorage, setNewbookStorage] =
    useState<ClientStorage<Book> | null>(null);

  const contextProps: NewbookContextProps = useMemo(
    () => ({
      newbook,
      setNewbook: (nextNewbook) => {
        newbookStorage?.set(nextNewbook);
        setNewbook(newbook);
      },
      removeNewbook: () => {
        newbookStorage?.remove();
        setNewbook(null);
      },
    }),
    [newbook, newbookStorage],
  );

  useEffect(
    () => setNewbookStorage(new ClientStorage<Book>(STORAGE_KEY, localStorage)),
    [],
  );

  useEffect(() => {
    if (newbookStorage) {
      setNewbook(newbookStorage.get());
    }
  }, [newbookStorage]);

  return (
    <NewbookContext.Provider value={contextProps}>
      {children}
    </NewbookContext.Provider>
  );
};

const useNewbookContext = () => useContext(NewbookContext);

export { NewbookProvider, useNewbookContext };
