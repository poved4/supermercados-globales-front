import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { BranchService } from '../../services/branch.service';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TabsComponent } from "../../components/dashboard/tabs/tabs.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SignInComponent } from "../sign-in/sign-in.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TabsComponent,
    NavbarComponent,
    SignInComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  authService = inject(AuthService);
  branchService = inject(BranchService);
  productService = inject(ProductService);

  authenticated: boolean = false;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {

    this.authService.sessionValidation();

    this.branchService.getAll();
    this.productService.getAll();

    this.subscription.add(
      this.authService
        .isAuthenticated$
        .subscribe(value => {
          this.authenticated = value;
        })
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
