import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Movement } from '../movement';
import { Category } from '../../shared/categories/category';

@Injectable()
export class MovementFormService {

  private categorySubject = new Subject<Category>();
  private movementIDSubject = new Subject<string>();
  private movementUpdatedIDSubject = new Subject<string>();

  category = this.categorySubject.asObservable();
  movementID = this.movementIDSubject.asObservable();
  movementUpdatedID = this.movementUpdatedIDSubject.asObservable();

  constructor() { }

  changeCategory(category: Category) {
    this.categorySubject.next(category);
  }
  changeMovementID(movementID: string) {
    this.movementIDSubject.next(movementID);
  }
  updateMovementID(movementUpdatedID: string) {
    this.movementUpdatedIDSubject.next(movementUpdatedID);
  }
}
