import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const skipUrl = [
            'https://fcmdev.thestorywallcafe.com/api/login/'
            
        ];
        if (skipUrl.indexOf(request.url) === -1) {
            let value=localStorage.getItem('token');
            request = request.clone({
                setHeaders: {
                    'Authorization': `${value}`,
                    'Content-Type': 'application/json',
                }
            });
        }
        return next.handle(request);
    }
}