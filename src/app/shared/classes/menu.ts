// import * as firebase from 'firebase';
import { Product } from './product';

export class Menu {
  constructor(
    public id?: string,
    public date?: any,
    public products?: Product[],
    public price?: number, 
    public available: boolean = false
  ){}
}
