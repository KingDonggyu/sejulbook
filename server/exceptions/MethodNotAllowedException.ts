import ExceptionBase from './ExceptionBase';

class MethodNotAllowedException extends ExceptionBase {
  constructor() {
    super({
      code: 405,
      name: 'Method Not Allowed',
      message: '요청한 HTTP 메서드가 서버에서 허용되지 않습니다.',
    });
  }
}

export default MethodNotAllowedException;
