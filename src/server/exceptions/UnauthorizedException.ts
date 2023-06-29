import ExceptionBase from '@/lib/HttpErrorException';

class UnauthorizedException extends ExceptionBase {
  constructor(message: string) {
    super({ code: 401, name: 'Unauthorized', message });
  }
}

export default UnauthorizedException;
