import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserRole} from '/Angular/expense-management-webapp/src/app/components/userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<UserRole | null>(null);
  public userRole$ = this.userRoleSubject.asObservable();

   // Simulate login with a hardcoded token and role
   login(username: string, password: string): Observable<void> {
    let mockRole: UserRole;

    switch (username) {
      case 'admin':
        mockRole = UserRole.Admin;
        break;
      case 'manager':
        mockRole = UserRole.Manager;
        break;
      default:
        mockRole = UserRole.User;
    }

    const mockToken = 'mock.jwt.token';
    localStorage.setItem('authToken', mockToken);
    this.userRoleSubject.next(mockRole);
    return of();
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get the token from storage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('token');  // Remove token or any authentication data
    this.userRoleSubject.next(null);
  }

  // Check if the current user has a certain role
  hasRole(role: UserRole): boolean {
    return this.userRoleSubject.value === role;
  }

  // Set user role (simulated for demo)
  setUserRole(role: string) {
    localStorage.setItem('userRole', role); // Store role in local storage
  }

  // Get user role
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

}
