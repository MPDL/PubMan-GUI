import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AaService {

  private tokenUrl: string = 'https://pure.mpg.de/rest/login'; //'https://qa.pure.mpdl.mpg.de/rest/login';

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    return sessionStorage.getItem('token')!;
  }

  set token(token) {
    sessionStorage.setItem('token', token);
  }

  get user(): any {
    return JSON.parse(sessionStorage.getItem('user')!);
  }

  set user(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  get isLoggedIn(): boolean {
    if (sessionStorage.getItem('isLoggedIn')) {
      return !!JSON.parse(sessionStorage.getItem('isLoggedIn')!.toLowerCase());
    } else {
      return false;
    }
  }

  set isLoggedIn(bool) {
    sessionStorage.setItem('isLoggedIn', String(bool));
  }

  get isAdmin(): boolean {
    if (sessionStorage.getItem('isAdmin')) {
      return !!JSON.parse(sessionStorage.getItem('isAdmin')!.toLowerCase());
    } else {
      return false;
    }
  }

  set isAdmin(bool) {
    sessionStorage.setItem('isAdmin', String(bool));
  }

  login(userName: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = userName + ':' + password;
    return this.http.request('POST', this.tokenUrl, {
      body: body,
      headers: headers,
      observe: 'response',
      responseType: 'text',
    }).pipe(
      switchMap((response) => {
        const token = response.headers.get('Token');
        if (token != null) {
          this.token = token;
          this.isLoggedIn = true;
          return this.who(token);
        } else {
          console.error(response.statusText);
          return EMPTY;
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(JSON.stringify(error) || 'UNKNOWN ERROR!'));
      })
    );
  }

  logout(): void {
    sessionStorage.clear();
  }

  who(token: string | string[]): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    const whoUrl = this.tokenUrl + '/who';
    let user: any;

    return this.http.request<any>('GET', whoUrl, {
      headers: headers,
      observe: 'body',
    }).pipe(
      map((response) => {
        user = response;
        this.user = user;
        if (user.grantList != null) {
          if (user.grantList.find((grant: any) => grant.role === 'SYSADMIN')) {
            this.isAdmin = true;
          }
        }
        return user;
      }),
      catchError((error) => {
        return throwError(() => new Error(JSON.stringify(error) || 'UNKNOWN ERROR!'));
      })
    );
  }
}
