import type { Book } from 'book';
import LocalStorage from '../../lib/LocalStorage';

class NewBookRepository extends LocalStorage<Book> {
  constructor() {
    super('SEJULBOOK_NEWBOOK');
  }
}

export default NewBookRepository;
