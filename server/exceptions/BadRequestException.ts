import ExceptionBase from './ExceptionBase';

class BadRequestException extends ExceptionBase {
  constructor(message: string) {
    super({ code: 400, message });
  }
}

export default BadRequestException;
