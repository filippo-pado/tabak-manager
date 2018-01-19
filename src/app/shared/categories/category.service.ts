import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CategoryService {
  private categoryUrl = '/api/categories'; // URL to web api
  private categorySubject = new Subject<Category>();

  category = this.categorySubject.asObservable();

  constructor(private http: HttpClient) { }

  changeCategory(category: Category) {
    this.categorySubject.next(category);
  }

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
