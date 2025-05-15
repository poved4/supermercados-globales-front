export interface Inventory {

  id?: number;
  branchId: number;
  productId: number;
  stock: number;
  stockMin: number;
  stockMax: number;
  salesPrice: number;
  discount: number;

}
