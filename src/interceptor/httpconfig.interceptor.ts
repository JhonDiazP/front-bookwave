import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler,
    HttpEvent,
    HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "src/app/auth.service";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,private messageService: MessageService,private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.GetToken();
        // req = req.clone({
        //     setHeaders: {
        //         Authorization: "Bearer " + authToken
        //     }
        // });
        // return next.handle(req);
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + authToken.access_token) });

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }), catchError((error: HttpErrorResponse) => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Ocurrió un error',
                    detail: error.error.msg ? error.error.msg : error.error.message
                })
                new Promise((res) => {
                    if (error.status === 401 || error.status === 403) {
                        setTimeout(() => {
                            this.router.navigateByUrl('/login/auth');
                        }, 4000);
                    }
                });
                return throwError(error);
            })
        );

    }
}
