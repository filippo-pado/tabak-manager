import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '@app/core/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.injector.get(AuthService).getToken();
    if (!token) { return next.handle(req); }
    const reqClone = req.clone({
      headers: req.headers
        .set('Authorization', 'Bearer ' + token)
        .append('Content-Type', 'application/json')
    });
    return next.handle(reqClone);
  }
}
