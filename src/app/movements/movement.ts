export class Movement {
  _id: string;
  category: string = '';
  date: Date = new Date();
  amount: number = 0;
  rid: number = 0;
  extraRid: number = 0;
  verified: boolean = false;
  verifiedRid: string = null;
  note: string = '';
}
