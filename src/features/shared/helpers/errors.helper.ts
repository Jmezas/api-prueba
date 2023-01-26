import { ExecutionContext } from '@nestjs/common';
import { Trace } from './trace.helper';

export interface IError extends Error {
  status?: number;
  traceId?: string;
}
export class HandlerErrors {
  static notFound(context: ExecutionContext) {
    const next = context.switchToHttp().getNext();
    const error: Partial<IError> = new Error('Not Found');
    error.status = 404;
    next(error);
  }

  static catchError(ftn: (context: ExecutionContext) => Promise<any>) {
    return (context: ExecutionContext) => {
      const next = context.switchToHttp().getNext();
      return ftn(context).catch((error) => {
        const err: Partial<IError> = new Error('falla intermitente');
        err.message = error.message;
        err.stack = error.stack;
        err.status = 409;

        next(err);
      });
    };
  }

  static generic(error: IError, context: ExecutionContext) {
    const res = context.switchToHttp().getResponse();
    const objError: Partial<IError> = {
      traceId: Trace.TraceId(),
      name: error.name,
      status: error.status,
      message: error.message,
    };

    if (process.env.NODE_ENV !== 'production') {
      objError.stack = error.stack;
    }

    res.status(error.status).json(objError);
  }
}
