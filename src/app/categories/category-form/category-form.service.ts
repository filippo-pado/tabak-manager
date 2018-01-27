import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CategoryFormService {
  private categoryUpdatedIDSubject = new Subject<string>();
  categoryUpdatedID = this.categoryUpdatedIDSubject.asObservable();

  constructor() { }

  updateCategoryID(categoryUpdatedID: string) {
    this.categoryUpdatedIDSubject.next(categoryUpdatedID);
  }
}
