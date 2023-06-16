import ExceptionBase from './ExceptionBase';

class UnauthorizedException extends ExceptionBase {
  constructor(message: string) {
    super({ code: 401, name: 'Unauthorized', message });
  }
}

export default UnauthorizedException;
