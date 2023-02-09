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
  getNewbook: () => Book | null;
  setNewbook: (book: Book) => void;
  removeNewbook: () => void;
}

const NewbookContext = createContext<NewbookContextProps>({
  getNewbook: () => null,
  setNewbook: () => {},
  removeNewbook: () => {},
});

const NewbookProvider = ({ children }: { children: ReactNode }) => {
  const [bookStorage, setBookStorage] = useState<ClientStorage<Book> | null>(
    null,
  );

  const contextProps: NewbookContextProps = useMemo(
    () => ({
      getNewbook: () => {
        if (bookStorage) {
          return bookStorage.get();
        }
        return null;
      },
      setNewbook: (book: Book) => bookStorage?.set(book),
      removeNewbook: () => bookStorage?.remove(),
    }),
    [bookStorage],
  );

  useEffect(
    () => setBookStorage(new ClientStorage<Book>(STORAGE_KEY, localStorage)),
    [],
  );

  return (
    <NewbookContext.Provider value={contextProps}>
      {children}
    </NewbookContext.Provider>
  );
};

const useNewbookContext = () => useContext(NewbookContext);

export { NewbookProvider, useNewbookContext };
