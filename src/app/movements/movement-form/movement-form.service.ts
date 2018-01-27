import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MovementFormService {

  private movementUpdatedIDSubject = new Subject<string>();

  movementUpdatedID = this.movementUpdatedIDSubject.asObservable();

  constructor() { }

  updateMovementID(movementUpdatedID: string) {
    this.movementUpdatedIDSubject.next(movementUpdatedID);
  }
}
