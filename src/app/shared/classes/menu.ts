import { Product } from './product';
import * as firebaseApp from 'firebase/app';

export class Menu {
  constructor(
    public id?: string,
    public date?: firebaseApp.firestore.Timestamp,
    public products?: Product[],
    public price?: number,
    public available: boolean = false
  ) { }
}
