import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');

    if (authToken) {
      const authReq = request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer ' + authToken)
          .set('Content-Type', 'application/json'),
      });

      return next.handle(authReq);
    }

    const newReq = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'),
    });
    return next.handle(newReq);
  }
}
