export interface Product {
  id?: string;
  name?: string;
  description?: string;
  imageURL?: string;
  price?: number,
  cost?: number,
  category?: string;
}
export class Product {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public imageURL?: string,
    public price?: number,
    public cost?: number,
    public category?: string
  ) { }
}