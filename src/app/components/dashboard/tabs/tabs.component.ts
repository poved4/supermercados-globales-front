import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';

import { InventoryTableComponent } from "../../inventory-table/inventory-table.component";
import { CardDetailsComponent } from "../../order/card-details/card-details.component";
import { ProductService } from '../../../services/product.service';
import { BranchService } from '../../../services/branch.service';
import { Product } from '../../../interfaces/product';
import { Branch } from '../../../interfaces/branch';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CardDetailsComponent,
    InventoryTableComponent,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {

  // dependency inject
  branchService = inject(BranchService);
  productService = inject(ProductService);
  // orderStatusService = inject(OrderStatusService);

  selectedBranchId = signal(0);

  branches(): Branch[] {

    let branches: Branch[] = [];

    this.branchService
      .getAll()
      .subscribe(body => {
        branches = body;
      });

    return branches;

  }

  products(): Product[] {

    let products: Product[] = [];

    this.productService
      .getAll()
      .subscribe(body => {
        products = body;
      });

    return products;

  }

}
