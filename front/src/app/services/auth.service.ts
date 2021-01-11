import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import { User } from '../models/user';

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
  errorMessage: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.errorMessage = '';
  }


  logout() {
    this.isError = false;
    this.errorMessage = '';
    this.router.navigate(['login']);
    sessionStorage.clear()
  }

  loginCall(login: string, password: string): Observable<User> {
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

  loggedIn(){
    return sessionStorage.getItem('user') !== null
  }

  getUserFromSessionStorage(): User{
    return JSON.parse(sessionStorage.getItem('user')) as User
  }

  setUserToSessionStorage(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user))
  }


}
