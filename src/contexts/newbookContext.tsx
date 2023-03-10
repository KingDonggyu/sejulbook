import { createContext, ReactNode, useContext, useMemo } from 'react';
import { Book } from '@/types/features/book';
import useLocalStorage from '@/hooks/useLocalStorage';

const STORAGE_KEY = 'SEJULBOOK_NEWBOOK';

interface NewbookContextProps {
  getNewbook: () => { newBook: Book | null; isLoading: boolean };
  setNewbook: (newBook: Book) => void;
  removeNewbook: () => void;
}

const NewbookContext = createContext<NewbookContextProps>({
  getNewbook: () => ({ newBook: null, isLoading: true }),
  setNewbook: () => {},
  removeNewbook: () => {},
});

const NewbookProvider = ({ children }: { children: ReactNode }) => {
  const bookStorage = useLocalStorage<Book>(STORAGE_KEY);

  const contextProps: NewbookContextProps = useMemo(
    () => ({
      getNewbook: () => {
        if (bookStorage) {
          return { newBook: bookStorage.get(), isLoading: false };
        }
        return { newBook: null, isLoading: true };
      },
      setNewbook: (newBook) => bookStorage?.set(newBook),
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
