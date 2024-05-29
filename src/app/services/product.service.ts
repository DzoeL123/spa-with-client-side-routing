import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  makeInvalidCall() {
    const url = 'https://your-invalid-api.com/invalid-endpoint';
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('API Error:', err);
        return throwError(() => new Error('API call failed'));
      })
    );
  }
}
