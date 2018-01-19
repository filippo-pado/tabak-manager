import { Movement } from '../movements/movement';

export class Rid {
  _id: string;
  category: string = '';
  description: string = '';
  date: Date = new Date();
  amount: number = 0;
  verified: boolean = false;
  verifiedMovement: Movement = new Movement();
}
