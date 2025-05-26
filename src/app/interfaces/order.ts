import { OrderStatus } from "./order-status";

export interface Order {

  id?: number;
  status: OrderStatus;
  branchId: number;
  deliveryDate: string;

}
