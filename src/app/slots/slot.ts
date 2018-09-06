import { SlotReport } from '@app/slots';

export class Slot {
  _id: string;
  position: number = 1;
  name: string = '';
  operational: boolean = true;
  reports: [SlotReport];
}
