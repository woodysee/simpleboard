import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from './task';
import { mockTasks } from './mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private allTasksUrl = 'http://localhost:3000/tasks/api';  // URL to web api
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
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  getMockTasks(): Observable<Task[]> {
    return of(mockTasks);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.allTasksUrl).pipe(
      catchError(this.handleError('getAllTasks', []))
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.allTasksUrl, task.data.attributes, this.httpOptions)
      .pipe(
        catchError(this.handleError('addTask', task))
      );
  }

  updateTask(task: Task): Observable<Task> {
    // console.log(`${this.allTasksUrl}/${task.data.id}`);
    return this.http.put<Task>(`${this.allTasksUrl}/${task.data.id}`, task.data.attributes, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateTask', task))
      );
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.allTasksUrl}/${task.data.id}`, this.httpOptions).pipe(
      catchError(this.handleError('deleteTask', task))
    );
  }

}
