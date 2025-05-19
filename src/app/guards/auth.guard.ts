import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { environment as env } from '../../environments/environment';
import { LocalStorageServiceService } from '../services/local-storage-service.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const storage = inject(LocalStorageServiceService);

  const jwt = storage.getItem(env.storage.accessToken);

  if (jwt !== null) {

    return true;

  } else {

    router.navigateByUrl('signIn');
    return false;

  }

};
