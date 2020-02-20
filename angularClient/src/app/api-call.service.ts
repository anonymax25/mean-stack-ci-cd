import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Task } from './task';
import {Observable, of} from 'rxjs';
import {environment} from '../environments/environment';
import {catchError, tap} from 'rxjs/operators';

const localUrl = 'assets/data/tasks.json';

const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl + '/task', optionRequete).pipe(
      catchError(this.handleError<Task[]>('getTasks', [])));
  }

  deleteTask(task: Task): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/deletetask', task, optionRequete).pipe(
      catchError(this.handleError<any>('deleteTask', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}