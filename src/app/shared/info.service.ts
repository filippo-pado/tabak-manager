import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Info } from '../shared/info';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class InfoService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private infoUrl = '/api/info'; // URL to web api

  constructor(private http: HttpClient) { }

  getInfo(): Promise<Info> {
    return this.http.get(this.infoUrl)
      .toPromise()
      .then(response => {
        return response as Info;
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
