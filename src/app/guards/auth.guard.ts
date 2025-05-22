import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  let activeSession: boolean = false;

  authService
    .sessionValidation()
    .subscribe(x => {
      activeSession = x.isValid;
    });

  if (!activeSession) {
    router.navigateByUrl('signIn');
    return false;
  }

  return true;

};
