import { Component, inject, OnInit } from '@angular/core';

import { BranchService } from '../../services/branch.service';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TabsComponent } from "../../components/dashboard/tabs/tabs.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    TabsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  branchService = inject(BranchService);
  productService = inject(ProductService);

  ngOnInit(): void {
    this.branchService.getAll();
    this.productService.getAll();
  }

}
