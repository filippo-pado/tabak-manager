import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../shared/category';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private categoryUrl = '/api/categories'; // URL to web api

  constructor(private http: HttpClient) { }

  getAll(): Promise<Category[]> {
    return this.http.get(this.categoryUrl)
      .toPromise()
      .then(response => {
        return response as Category[];
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
