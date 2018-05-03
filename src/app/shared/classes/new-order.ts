import { Product } from "./product";
import { User } from "firebase";

export class NewOrder {
  constructor(
    public id?: string,
    public products?: {
      principal: Product,
      acompanamientos: Product[],
      bebida: Product
    },
    public tortillas?: number,
    public price?: number,
    public forDate?: Date,
  ) { }
}
