import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';

import { InventoryService } from '../../services/inventory.service';
import { NoDataComponent } from "../no-data/no-data.component";
import { Product } from '../../interfaces/product';
import { Branch } from '../../interfaces/branch';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    CommonModule,
    NoDataComponent
  ],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.css'
})
export class InventoryTableComponent {

  inventoryService = inject(InventoryService);

  products = input.required<Product[]>();
  branches = input.required<Branch[]>();
  branchID = input.required<number>();
  inventory: any[] = [];

  constructor() {
    effect(() => {
      if (this.branchID() !== undefined && this.branchID() !== 0) {
        const list = this.loadBranchData(this.branchID());
        this.inventory = list;
      }
    });
  }

  private loadBranchData(branchID: number): any[] {

    let inventory: any[] = [];

    this.inventoryService
      .getById(branchID)
      .subscribe(body => {

        body.forEach(item => {

          let ivn: any = {};
          ivn.id = item.id;
          ivn.stock = item.stock;
          ivn.stockMin = item.stockMin;
          ivn.stockMax = item.stockMax;
          ivn.discount = item.discount;
          ivn.salesPrice = item.salesPrice;

          ivn.stockTextDanger = item.stock <= (item.stockMin + 5) || item.stock >= (item.stockMax - 5);
          ivn.stockTextWarning = item.stock <= (item.stockMin + 10) || item.stock >= (item.stockMax - 10);

          if (ivn.stockTextWarning && ivn.stockTextDanger) {
            ivn.stockTextWarning = false;
          }

          ivn.branch = this.branches().filter(x => x.id === item.branchId)[0];
          delete ivn.branchId;

          ivn.product = this.products().filter(x => x.id === item.productId)[0];
          delete ivn.productId;

          inventory.push(ivn);

        })

      });

    return inventory;

  }

}
