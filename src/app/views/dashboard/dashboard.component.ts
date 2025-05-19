import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BranchService } from '../../services/branch.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { OrderStatusService } from '../../services/order-status.service';
import { InventoryService } from '../../services/inventory.service';
import { OrderDetailService } from '../../services/order-detail.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  branchService = inject(BranchService);
  inventoryService = inject(InventoryService);
  orderDetailService = inject(OrderDetailService);
  orderStatusService = inject(OrderStatusService);
  orderService = inject(OrderService);
  productService = inject(ProductService);

  // branches: Branch[] = []

  constructor() { }

  ngOnInit(): void {

  }

}
