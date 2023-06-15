import ExceptionBase from './ExceptionBase';

class InternalServerException extends ExceptionBase {
  constructor(message: string) {
    super({ code: 500, message });
  }
}

export default InternalServerException;
