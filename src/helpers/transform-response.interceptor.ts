
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerResponse } from 'http';
import { ResponseDataModel } from './models/response.model';
import { parseResponse } from './function-helpers';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ResponseDataModel<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDataModel<T>> {
        const response: ServerResponse = context.switchToHttp().getResponse();
        return next.handle().pipe(
            map(data => parseResponse<T>(data, response.statusCode)));
    }
}