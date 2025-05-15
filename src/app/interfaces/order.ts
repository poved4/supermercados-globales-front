import { OrderStatus } from "./order-status";

export interface Order {

  id?: number;
  statusId: OrderStatus;
  branchId: number;
  deliveryDate: string;

}
