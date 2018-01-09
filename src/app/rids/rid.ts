export class Rid {
  _id: string;
  category: string = '';
  description: string = '';
  date: Date = new Date();
  amount: number = 0;
  verified: boolean = false;
  verifiedMovement: string = null;
}