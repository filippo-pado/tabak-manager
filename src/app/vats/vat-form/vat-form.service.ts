import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class VatFormService {
  private vatUpdatedIDSubject = new Subject<string>();
  vatUpdatedID = this.vatUpdatedIDSubject.asObservable();

  constructor() { }

  updateVatID(vatUpdatedID: string) {
    this.vatUpdatedIDSubject.next(vatUpdatedID);
  }
}
