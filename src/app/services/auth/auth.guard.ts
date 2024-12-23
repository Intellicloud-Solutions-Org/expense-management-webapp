import { CanActivateFn,  Router } from '@angular/router';
//import { AuthService } from '../auth/auth.service'
import { inject } from '@angular/core';
import { UserRole} from '../../components/userRole';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as UserRole[];
  const token = localStorage.getItem('jwtToken');
  const userRole = localStorage.getItem('userRole') as UserRole;

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};



