class LocalStorage<Data = unknown> {
  private key;

  constructor(key: string) {
    this.key = key;
  }

  get() {
    const data = window.localStorage.getItem(this.key);

    if (data === null) {
      return data;
    }

    return JSON.parse(data) as Data;
  }

  set(data: Data) {
    window.localStorage.setItem(this.key, JSON.stringify(data));
  }

  remove() {
    window.localStorage.removeItem(this.key);
  }
}

export default LocalStorage;
