import LocalStorage from './LocalStorage';

interface Book {
  title: string;
  thumbnail: string | undefined;
  authors: string;
  publisher: string;
  datetime: string;
}

class BookRepository extends LocalStorage<Book> {
  constructor() {
    super('SEJULBOOK_NEWBOOK');
  }
}

export default BookRepository;
