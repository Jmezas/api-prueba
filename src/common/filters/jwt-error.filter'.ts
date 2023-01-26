import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

export class JwtErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(401).json({ message: 'Invalid token' });
  }
}
