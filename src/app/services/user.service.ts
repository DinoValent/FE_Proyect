import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/User/';

  constructor(private http: HttpClient) {}

  verifyLogin(password: string, email: string): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}login`;
    const data = { password, email };
    return this.http.post(url, data).pipe(
      tap((response: any) => {
        const token = response?.token; // Extract the token from the response
        if (token) {
          localStorage.setItem('token', token); // Store the token in local storage
        }
      })
    );
  }
  register(user: User): Observable<User> {
    const url = `${this.myAppUrl}api/User`;
    return this.http.post<User>(url, user);
  }
}
