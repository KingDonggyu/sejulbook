class ExceptionBase extends Error {
  code: number;

  message: string;

  constructor({ code, message }: { code: number; message: string }) {
    super();
    this.code = code;
    this.message = message;
  }
}

export default ExceptionBase;
