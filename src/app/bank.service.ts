import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private dataUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorId': 100 })
  };

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.dataUrl.concat('/bp/products'), this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched accounts')),
        catchError(this.handleError<Account[]>('getProducts', []))
      );
  }

  addProduct(body: any): Observable<Account> {
    return this.http.post(this.dataUrl.concat('/bp/products'), body, this.httpOptions).pipe(
      tap((newHero: any) => console.log(newHero)),
      catchError(this.handleError<Account>('addProduct'))
    );
  }

  getProduct(id: String): Observable<Boolean> {
    const url = `${this.dataUrl}/bp/products/verification/?id=${id}`;
    return this.http.get<Boolean>(url, this.httpOptions).pipe(
      tap(_ => console.log('fetched account')),
      catchError(this.handleError<Boolean>(`getProduct id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
