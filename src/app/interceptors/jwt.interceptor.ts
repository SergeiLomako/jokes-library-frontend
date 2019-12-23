import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authUser = this.authService.authUserData;

    if (authUser && authUser.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authUser.access_token}`,
        }
      });
    }

    return next.handle(request);
  }
}

