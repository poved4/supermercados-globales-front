import { ProductCategory } from "./product-category";
import { Supplier } from "./supplier";

export interface Product {

  id?: number;
  code: string;
  name: string;
  description: string;
  supplier: Supplier;
  category: ProductCategory;

}
