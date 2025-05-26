import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';

import { OrderDetailService } from '../../../services/order-detail.service';
import { NoDataComponent } from "../../no-data/no-data.component";
import { OrderService } from '../../../services/order.service';
import { Product } from '../../../interfaces/product';
import { Branch } from '../../../interfaces/branch';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [
    CommonModule,
    NoDataComponent
  ],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent {

  orderService = inject(OrderService);
  orderDetailService = inject(OrderDetailService);

  products = input.required<Product[]>();
  branches = input.required<Branch[]>();
  branchID = input.required<number>();
  orders: any[] = [];

  constructor() {
    effect(() => {
      if (this.branchID() !== undefined && this.branchID() !== 0) {
        const list = this.loadBranchData(this.branchID());
        this.orders = list;
      }
    });
  }

  private loadBranchData(branchID: number): any[] {

    let orders: any[] = [];

    this.orderService
      .getOrdersByBranch(branchID)
      .subscribe(body => {
        body.forEach(order => {

          let newOrder: any = { ...order };

          newOrder.branch = this.branches().filter(x => x.id === order.branchId)[0];
          delete newOrder.branchId;

          newOrder.total = 0;
          newOrder.details = [];

          this.orderDetailService
            .getByOrderId(newOrder.id)
            .subscribe(details => {

              details.forEach(detail => {

                let newDetail: any = { ...detail };

                newDetail.product = this.products().filter(x => x.id === detail.productId)[0];
                delete newDetail.productId;

                newOrder.total += (newDetail.quantity * newDetail.itemValue);
                newOrder.details.push(newDetail);

              });

            });

          orders.push(newOrder);

        });
      });

    return orders;
  }

}
