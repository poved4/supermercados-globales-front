import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    title: 'Supermercados Globales',
  },
  {
    path: 'signUp',
    component: SignUpComponent,
    title: 'Supermercados Globales',
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
