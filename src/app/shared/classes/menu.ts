import { Product } from './product';
import * as firestore from 'firebase/firestore';

export class Menu {
  constructor(
    public id?: string,
    public date?: firestore.Timestamp,
    public products?: Product[],
    public price?: number,
    public available: boolean = false
  ) { }
}
