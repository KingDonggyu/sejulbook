import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { Book } from '@/types/domain/book';
import ClientStorage from '@/lib/ClientStorage';
import Route from '@/constants/routes';

const STORAGE_KEY = 'SEJULBOOK_NEWBOOK';

interface NewbookContextProps {
  newbook: Book | null;
  setNewbook: (nextNewbook: Book) => void;
  removeNewbook: () => void;
  handleClickSearchedItem: (selectedBook: Book) => void;
}

const NewbookContext = createContext<NewbookContextProps>({
  newbook: null,
  setNewbook: () => {},
  removeNewbook: () => {},
  handleClickSearchedItem: () => {},
});

const NewbookProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [bookStorage, setBookStorage] = useState<ClientStorage<Book> | null>(
    null,
  );

  const setNewbook = useCallback(
    (nextNewbook: Book) => {
      bookStorage?.set(nextNewbook);
      setBook(book);
    },
    [book, bookStorage],
  );

  const contextProps: NewbookContextProps = useMemo(
    () => ({
      newbook: book,
      setNewbook,
      removeNewbook: () => {
        bookStorage?.remove();
        setBook(null);
      },
      handleClickSearchedItem: (selectedBook) => {
        setNewbook(selectedBook);
        router.push(Route.NEWBOOK_WRITE);
      },
    }),
    [book, bookStorage, router, setNewbook],
  );

  useEffect(
    () => setBookStorage(new ClientStorage<Book>(STORAGE_KEY, localStorage)),
    [],
  );

  useEffect(() => {
    if (bookStorage && bookStorage.has()) {
      setBook(bookStorage.get());
    }
  }, [bookStorage]);

  return (
    <NewbookContext.Provider value={contextProps}>
      {children}
    </NewbookContext.Provider>
  );
};

const useNewbookContext = () => useContext(NewbookContext);

export { NewbookProvider, useNewbookContext };
