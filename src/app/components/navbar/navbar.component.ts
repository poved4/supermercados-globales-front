import { Router, RouterModule } from '@angular/router';
import { Component, inject, signal } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router);
  authService = inject(AuthService);

  onLogOut() {

    this.authService.logOut().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
      }
    });

    this.router.navigateByUrl('/');

  }

}
