import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
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

  getOne(id: string): Promise<Category> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Category)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
