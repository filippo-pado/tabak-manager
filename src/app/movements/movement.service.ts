import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movement } from './movement';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovementService {
  private movementsUrl = '/api/movements';

  constructor(private http: HttpClient) { }

  getAll(): Promise<Movement[]> {
    return this.http.get(this.movementsUrl)
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

  query(query: any = {}, populate: string = ''): Promise<Movement[]> {
    return this.http.post(this.movementsUrl + '/query', { query: query, populate: populate })
      .toPromise()
      .then(response => response as Movement[])
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
