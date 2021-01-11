import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uploadProfileImage(userId: String, file: File): Observable<HttpEvent<{avatarKey: string}>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      }),
      reportProgress: true
    };

    const formdata: FormData = new FormData();
    formdata.append('file', file)

    //const req = new HttpRequest('PUT', `http://localhost:5000/api/files/upload`, formdata, httpOptions);
    const req = new HttpRequest('PUT', `${environment.apiUrl}/user/${userId}/avatar`, formdata, httpOptions);
    return this.http.request(req);
  }

  getAvatar(user: User): Observable<Blob> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      }),
      responseType: 'blob'
    };

    return this.http.get(`${environment.apiUrl}/user/${user._id}/avatar`, 
      {
        headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
        }),
        responseType: 'blob'
      }
    )
  }
}
