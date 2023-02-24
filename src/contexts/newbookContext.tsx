import { createContext, ReactNode, useContext, useMemo } from 'react';
import { Book } from '@/types/features/book';
import useLocalStorage from '@/hooks/useLocalStorage';

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
  const bookStorage = useLocalStorage<Book>(STORAGE_KEY);

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

  return (
    <NewbookContext.Provider value={contextProps}>
      {children}
    </NewbookContext.Provider>
  );
};

const useNewbookContext = () => useContext(NewbookContext);

export { NewbookProvider, useNewbookContext };
