import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor{

  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken();

    if (authToken) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      return next.handle(authReq);
    }

    return next.handle(request);
  }

}
