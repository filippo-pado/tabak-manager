import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {
  private authUrl: string = '/api/users/login';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private trusted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private token: string = null;

  // make isLoggedIn public readonly
  get isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }
  get isTrusted(): boolean {
    return this.trusted.getValue();
  }
  get loginObserver(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  get trustedObserver(): Observable<boolean> {
    return this.trusted.asObservable();
  }
  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.loggedIn.next(true);
      this.token = localStorage.getItem('token');
    }
  }

  login(password: string): Promise<any> {
    return this.http.post(this.authUrl, { password: password })
      .toPromise()
      .then(response => {
        // login successful if there's a jwt token in the response
        const token = response['token'];
        if (token) {
          // store jwt token in local storage to keep member logged in between page refreshes
          localStorage.setItem('token', token);
          localStorage.setItem('trusted', response['trusted']);
          this.token = token;
          this.loggedIn.next(true);
          this.trusted.next(response['trusted']);
        } else {
          return Promise.reject('No token or member provided');
        }
      })
      .catch(this.handleError);
  }

  logout(): void {
    // remove member from local storage to log user out
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('trusted');
    this.loggedIn.next(false);
    this.trusted.next(false);
  }
  getToken(): string {
    return this.token;
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
