import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isError = false;
  isLogged: boolean;
  errorMessage: string;
  user: any;

  constructor(private http: HttpClient,
              private router: Router) {
    this.isLogged = false;
    this.errorMessage = '';
    this.user = undefined;
  }


  logout() {
    this.user = undefined;
    this.isError = false;
    this.errorMessage = '';
    this.router.navigate(['login']);
  }

  loginCall(login: string, password: string) {
    this.isError = false;
    this.errorMessage = '';
    return this.http.get<any>(environment.apiUrl + '/login/' + login + '/' + password, optionRequete).pipe(
      catchError(this.handleError<any>('login', [])));
  }

  signupCall(login: string, password: string) {
    this.isError = false;
    this.errorMessage = '';
    return this.http.post<any>(environment.apiUrl + '/signup', {login, password}, optionRequete).pipe(
      catchError(this.handleError<any>('signup', [])));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.isError = true;
      this.errorMessage = error.message;
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }


}
