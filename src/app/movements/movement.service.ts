import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rid } from '../shared/rid';

import 'rxjs/add/operator/toPromise';
import { Movement } from '../shared/movement';

@Injectable()
export class MovementService {
  private movementsUrl = '/api/movements'; // URL to web api

  constructor(private http: HttpClient) { }

  getAll(params: any = {}): Promise<Movement[]> {
    return this.http.get(this.movementsUrl, { params: params })
      .toPromise()
      .then(response => response as Movement[])
      .catch(this.handleError);
  }

  getOne(id: string): Promise<Movement> {
    const url = `${this.movementsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Movement)
      .catch(this.handleError);
  }

  create(movement: Movement): Promise<Movement> {
    return this.http.post(this.movementsUrl, movement)
      .toPromise()
      .then(response => response as Movement)
      .catch(this.handleError);
  }

  update(id: string, updates: any): Promise<Movement> {
    const url = `${this.movementsUrl}/${id}`;
    return this.http.patch(url, updates)
      .toPromise()
      .then(response => response as Movement)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.movementsUrl}/${id}`;
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
