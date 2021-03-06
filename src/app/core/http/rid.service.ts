import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


import { Rid } from '@app/rids';

@Injectable()
export class RidService {
  private ridsUrl = '/api/rids';

  constructor(private http: HttpClient) { }

  getAll(): Promise<Rid[]> {
    return this.http.get(this.ridsUrl)
      .toPromise()
      .then(response => response as Rid[])
      .catch(this.handleError);
  }

  getOne(id: string): Promise<Rid> {
    const url = `${this.ridsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Rid)
      .catch(this.handleError);
  }

  query(query: any = {}, populate: string = '', sort: object = {}, limit: number = 100000000): Promise<Rid[]> {
    return this.http.post(this.ridsUrl + '/query', { query: query, populate: populate, sort: sort, limit: limit })
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

  createMany(rids: Rid[]): Promise<Rid[]> {
    return this.http.post(this.ridsUrl + '/bulk', rids)
      .toPromise()
      .then(response => response as Rid[])
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

  deleteAll(): Promise<void> {
    return this.http.delete(this.ridsUrl)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
