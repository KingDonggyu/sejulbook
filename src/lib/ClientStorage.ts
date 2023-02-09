class ClientStorage<T> {
  private key;

  private storage;

  private onException;

  constructor(key: string, storage: Storage, onException?: () => void) {
    this.key = key;
    this.storage = storage;
    this.onException = onException || (() => {});
  }

  has(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    return Boolean(this.storage.getItem(this.key));
  }

  get(): T | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const data = this.storage.getItem(this.key);

    if (data) {
      return JSON.parse(data as string);
    }

    this.onException();
    return null;
  }

  set(data: T) {
    if (typeof window !== 'undefined') {
      this.storage.setItem(this.key, JSON.stringify(data));
    }
  }

  remove() {
    if (typeof window !== 'undefined') {
      this.storage.removeItem(this.key);
    }
  }
}

export default ClientStorage;
