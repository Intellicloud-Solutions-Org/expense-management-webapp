import { CanActivateFn,  Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'
import { inject } from '@angular/core';
import { UserRole} from '/Angular/expense-management-webapp/src/app/components/userRole';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as UserRole[];
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole') as UserRole;

  // Check if the user is authenticated
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Check if the user has one of the expected roles
  if (expectedRoles.includes(userRole)) {
    return true;
  } else {
    router.navigate(['/forbidden']);
    return false;
  }
};