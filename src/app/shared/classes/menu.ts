import { Product } from './product';
import { Timestamp } from '@firebase/firestore-types';

export class Menu {
  constructor(
    public id?: string,
    public date?: Timestamp,
    public products?: Product[],
    public price?: number, 
    public available: boolean = false
  ){}
}
