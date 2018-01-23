import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Movement } from '../movement';
import { Category } from '../../shared/categories/category';

@Injectable()
export class MovementFormService {

  private movementUpdatedIDSubject = new Subject<string>();

  movementUpdatedID = this.movementUpdatedIDSubject.asObservable();

  constructor() { }

  updateMovementID(movementUpdatedID: string) {
    this.movementUpdatedIDSubject.next(movementUpdatedID);
  }
}
