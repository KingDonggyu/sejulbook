import ExceptionBase from './ExceptionBase';

class NotFoundException extends ExceptionBase {
  constructor(message: string) {
    super({ code: 404, name: 'Not Found', message });
  }
}

export default NotFoundException;
