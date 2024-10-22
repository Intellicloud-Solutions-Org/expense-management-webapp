import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
//import { AuthService } from '../auth/auth.service';
import { UserService } from '../user.service';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = userService.getToken();

  if (token) {
      console.log('Token:', token); // For debugging
      const authReq = req.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`
          }
      });
      return next(authReq);
  }

  return next(req);
};