import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rid } from '../shared/rid';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RidService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private ridsUrl = '/api/rids'; // URL to web api

  constructor(private http: HttpClient) { }

  getAll(params: any = {}): Promise<Rid[]> {
    return this.http.get(this.ridsUrl, { params: params })
      .toPromise()
      .then(response => response as Rid[])
      .catch(this.handleError);
  }

  create(rid: Rid): Promise<Rid> {
    return this.http.post(this.ridsUrl, rid)
      .toPromise()
      .then(response => response as Rid)
      .catch(this.handleError);
  }

  update(id: string, updates: any): Promise<Rid> {
    const url = `${this.ridsUrl}/${id}`;
    return this.http.patch(url, updates)
      .toPromise()
      .then(response => response as Rid)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.ridsUrl}/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
