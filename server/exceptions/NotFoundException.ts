import ExceptionBase from './ExceptionBase';

class NotFoundException extends ExceptionBase {
  constructor(message: string) {
    super({ code: 404, message });
  }
}

export default NotFoundException;
