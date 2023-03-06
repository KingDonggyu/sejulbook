import { createContext, ReactNode, useContext, useMemo } from 'react';
import { Book } from '@/types/features/book';
import useLocalStorage from '@/hooks/useLocalStorage';

const STORAGE_KEY = 'SEJULBOOK_NEWBOOK';

interface NewbookContextProps {
  getNewbook: () =>
    | { book: Book; isLoading: boolean }
    | { book: null; isLoading: boolean };
  setNewbook: (book: Book) => void;
  removeNewbook: () => void;
}

const NewbookContext = createContext<NewbookContextProps>({
  getNewbook: () => ({ book: null, isLoading: true }),
  setNewbook: () => {},
  removeNewbook: () => {},
});

const NewbookProvider = ({ children }: { children: ReactNode }) => {
  const bookStorage = useLocalStorage<Book>(STORAGE_KEY);

  const contextProps: NewbookContextProps = useMemo(
    () => ({
      getNewbook: () => {
        if (bookStorage) {
          return { book: bookStorage.get(), isLoading: false };
        }
        return { book: null, isLoading: true };
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
