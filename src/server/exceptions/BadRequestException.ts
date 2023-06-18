import ExceptionBase from '@/lib/HttpErrorException';

class BadRequestException extends ExceptionBase {
  constructor(message: string) {
    super({ code: 400, name: 'Bad Request', message });
  }
}

export default BadRequestException;
