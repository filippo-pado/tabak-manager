import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Log } from '@app/logs';



@Injectable()
export class LogService {
  private logsUrl = '/api/logs';

  constructor(private http: HttpClient) { }

  getAll(): Promise<Log[]> {
    return this.http.get(this.logsUrl)
      .toPromise()
      .then(response => response as Log[])
      .catch(this.handleError);
  }
  query(query: any = {}, populate: string = '', sort: object = {}, limit: number = 100000000): Promise<Log[]> {
    return this.http.post(this.logsUrl + '/query', { query: query, populate: populate, sort: sort, limit: limit })
      .toPromise()
      .then(response => response as Log[])
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }

}
