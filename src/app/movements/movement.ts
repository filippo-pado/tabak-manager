import { Category } from '../categories/category';
import { Rid } from '../rids/rid';

export class Movement {
  _id: string;
  category: Category = new Category();
  date: Date = new Date();
  amount: number = 0;
  rid: number = 0;
  extraRid: number = 0;
  verified: boolean = false;
  verifiedRid: Rid = null;
  note: string = '';
}
