class ExceptionBase extends Error {
  code: number;

  name: string;

  message: string;

  constructor({
    code,
    name,
    message,
  }: {
    code: number;
    name: string;
    message: string;
  }) {
    super();
    this.code = code;
    this.name = name;
    this.message = message;
  }
}

export default ExceptionBase;
