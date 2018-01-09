import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Movement } from '../movement';

@Injectable()
export class MovementFormService {

  private categorySubject = new Subject<string>();
  private movementIDSubject = new Subject<string>();
  private movementSubject = new Subject<Movement>();

  category = this.categorySubject.asObservable();
  movementID = this.movementIDSubject.asObservable();
  movement = this.movementSubject.asObservable();

  constructor() { }

  changeCategory(category: string) {
    this.categorySubject.next(category);
  }
  changeMovementID(movementID: string) {
    this.movementIDSubject.next(movementID);
  }
  changeMovement(movement: Movement) {
    this.movementSubject.next(movement);
  }
}
