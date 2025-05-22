import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BranchService } from '../../services/branch.service';
import { InventoryService } from '../../services/inventory.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { OrderStatusService } from '../../services/order-status.service';
import { OrderDetailService } from '../../services/order-detail.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Branch } from '../../interfaces/branch';
import { CommonModule } from '@angular/common';
import { Inventory } from '../../interfaces/inventory';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { NoDataComponent } from "../../components/no-data/no-data.component";
import { InventoryTableComponent } from "../../components/inventory-table/inventory-table.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NavbarComponent,
    NoDataComponent,
    InventoryTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  branchService = inject(BranchService);
  inventoryService = inject(InventoryService);
  // orderDetailService = inject(OrderDetailService);
  // orderStatusService = inject(OrderStatusService);
  // orderService = inject(OrderService);
  productService = inject(ProductService);

  selectedBranchId: number | null = null;

  branches: Branch[] = [];
  products: Product[] = [];
  inventory: any[] = [];

  ngOnInit(): void {

    this.branchService.getAll().subscribe(x => {
      this.branches = x;
    });

    this.productService.getAll().subscribe(x => {
      this.products = x;
    });

  }

  onBranchChange(event: Event) {

    this.inventory = [];
    const value = (event.target as HTMLSelectElement).value;

    this.inventoryService.getById(Number(value)).subscribe(body => {

      body.forEach(item => {

        let stockTextDanger: boolean = item.stock <= (item.stockMin + 5) || item.stock >= (item.stockMax - 5);
        let stockTextWarning: boolean = item.stock <= (item.stockMin + 10) || item.stock >= (item.stockMax - 10);

        if (stockTextWarning && stockTextDanger) {
          stockTextWarning = false;
        }

        let p = this.products.filter(x => x.id === item.productId)[0]

        this.inventory.push({

          pId: p.id,
          pCode: p.code,
          pName: p.name,
          pCategory: p.category.name,

          stock: item.stock,
          stockMin: item.stockMin,
          stockMax: item.stockMax,
          salesPrice: item.salesPrice,

          stockTextDanger: stockTextDanger,
          stockTextWarning: stockTextWarning

        });
      })

    });

  }

}
