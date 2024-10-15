import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserRole} from '/Project/expense-management-webapp/src/app/components/userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<UserRole | null>(null);
  public userRole$ = this.userRoleSubject.asObservable();

 
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
   
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get the token from storage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('token');  
    this.userRoleSubject.next(null);
  }

  
  hasRole(role: UserRole): boolean {
    return this.userRoleSubject.value === role;
  }


  setUserRole(role: string) {
    localStorage.setItem('userRole', role); // Store role in local storage
  }

 
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}