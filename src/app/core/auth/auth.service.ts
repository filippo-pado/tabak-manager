import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  private authUrl: string = '/api/users/login';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private token: string = null;

  // make isLoggedIn public readonly
  get isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }
  get loginObserver(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  constructor(
    @Inject('LOCALSTORAGE') private localStorage: any,
    private http: HttpClient
  ) {

    console.log(this.localStorage.getItem('token'));
    if (this.localStorage.getItem('token')) {
      this.loggedIn.next(true);
      this.token = this.localStorage.getItem('token');
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
          this.localStorage.setItem('token', token);
          this.token = token;
          this.loggedIn.next(true);
        } else {
          return Promise.reject('No token or member provided');
        }
      })
      .catch(this.handleError);
  }

  logout(): void {
    // remove member from local storage to log user out
    this.token = null;
    this.localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
  getToken(): string {
    return this.token;
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
