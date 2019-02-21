import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Column } from './column';
import { mockColumns } from './mock-columns';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  private allColumnsUrl = 'http://localhost:3000/columns/api';  // URL to web api
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  getMockColumns(): Observable<Column[]> {
    return of(mockColumns);
  }

  getAllColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(this.allColumnsUrl).pipe(
      catchError(this.handleError('getColumns', []))
    );
  }

}
