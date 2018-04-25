import { Category } from './category';
export interface Product {
  id?: string;
  name?: string;
  description?: string;
  photoURL?: string;
  price?: number,
  cost?: number,
  color?: string;
  brand?: string;
  category?: Category;
}
export class Product {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public photoURL?: string,
    public price?: number,
    public cost?: number,
    public color?: string,
    public brand?: string,
    public category?: Category
  ) { }
}