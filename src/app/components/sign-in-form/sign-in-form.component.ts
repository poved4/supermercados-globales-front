import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {

  router = inject(Router);
  authService = inject(AuthService);
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{10,}$/;

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]),
  });

  get passwordControl() {
    return this.signInForm.get('password');
  }

  onSubmit() {

    if (this.signInForm.valid) {

      const email: string = this.signInForm.value.email!;
      const password: string = this.signInForm.value.password!;

      this.authService.signIn(email, password).subscribe({
        next: (response) => {

          this.signInForm.reset();
          this.router.navigateByUrl('/dashboard');

        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
        }
      });
    }

  }

}
