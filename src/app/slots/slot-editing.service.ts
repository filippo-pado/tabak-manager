import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SlotEditingService {
  private saveReportSubject = new Subject<void>();
  private slotUpdatedIDSubject = new Subject<string>();

  public slotUpdatedID = this.slotUpdatedIDSubject.asObservable();
  public saveReport = this.saveReportSubject.asObservable();

  constructor() { }

  updatedSlotID(slotUpdatedID: string) {
    this.slotUpdatedIDSubject.next(slotUpdatedID);
  }
  notifySaveReport() {
    this.saveReportSubject.next();
  }
}
