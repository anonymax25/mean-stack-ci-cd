import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import { User } from '../models/user';

const requestOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isError = false;
  errorMessage: string;
  currentUser: User;

  constructor(private http: HttpClient,
              private router: Router) {
    this.errorMessage = '';
  }

  logout() {
    this.isError = false;
    this.errorMessage = '';
    this.router.navigate(['sign-in']);
    sessionStorage.clear();
  }

  signInCall(credentials: any): Observable<User> {
    this.isError = false;
    this.errorMessage = '';
    return this.http.post<any>(environment.apiUrl + '/sign-in', credentials, requestOptions).pipe(
      catchError(this.handleError<any>('sign-in', [])));
  }

  signUpCall(data: any) {
    this.isError = false;
    this.errorMessage = '';
    return this.http.post<any>(environment.apiUrl + '/sign-up', data, requestOptions).pipe(
      catchError(this.handleError<any>('sign-up', [])));
  }

  verifyCode(data: any) {
    this.isError = false;
    this.errorMessage = '';
    return this.http.post<any>(environment.apiUrl + '/verification', data, requestOptions).pipe(
      catchError(this.handleError<any>('verification-code', [])));
  }

  sendCode(data: any) {
    this.isError = false;
    this.errorMessage = '';
    return this.http.post<any>(environment.apiUrl + '/send/email', data, requestOptions).pipe(
      catchError(this.handleError<any>('send-code', [])));
  }

  resetPassword(data: any) {
    this.isError = false;
    this.errorMessage = '';
    return this.http.post<any>(environment.apiUrl + '/reset-password', data, requestOptions).pipe(
      catchError(this.handleError<any>('reset-password', [])));
  }

  deleteAccount(password: string) {
    console.log(this.currentUser.email);
    console.log(password);
    this.isError = false;
    this.errorMessage = '';
    return this.http.delete<any>(environment.apiUrl + '/user/' + this.currentUser.email + '/' +
      password, requestOptions).pipe(
      catchError(this.handleError<any>('reset-password', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.isError = true;
      this.errorMessage = error.message;
      return of(result as T);
    };
  }

  loggedIn() {
    return sessionStorage.getItem('user') !== null;
  }

  getUserFromSessionStorage(): User {
    return JSON.parse(sessionStorage.getItem('user')) as User;
  }

  setUserToSessionStorage(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
  }

  resetError() {
    this.errorMessage = ''
    this.isError = false;
  }
}
