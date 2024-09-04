import { CanActivateFn,  Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRoles();
  if (role) {
    return true; // Allow access
  } else {
    router.navigate(['/login']);
    return false; // Prevent access
  }
};
