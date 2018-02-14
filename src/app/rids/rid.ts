import { Movement } from '@app/movements';
import { Category } from '@app/categories';

export class Rid {
  _id: string;
  category: Category = new Category();
  description: string = '';
  date: Date = new Date();
  amount: number = 0;
  verified: boolean = false;
  verifiedMovement: string;
}
