import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          // To Handle successful responses 
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // To Handle error based on status code or message
        console.error(error.status, error.message)
        this.showErrorToast('Something went wrong: ' + error.message);

        return throwError(error);


      }),
    );
  }

  showErrorToast(message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      politeness: 'polite',
      announcementMessage: 'Something went wrong !'
    });
  }
}
