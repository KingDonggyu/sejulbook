import ExceptionBase from './ExceptionBase';

class InternalServerException extends ExceptionBase {
  constructor(message: string) {
    super({ code: 500, name: 'Internal Server Error', message });
  }
}

export default InternalServerException;
