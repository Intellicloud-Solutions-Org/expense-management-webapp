import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private rolesKey = 'roles';

  constructor() {}

  login(userName: string, password: string): { token: string | null, roles: string[] } {
    const exampleToken = 'example-jwt-token';

    if (userName === 'admin' && password === 'Admin@123') {
      return { token: exampleToken, roles: ['Admin'] };
    } else if (userName === 'manager' && password === 'Manager@123') {
      return { token: exampleToken, roles: ['Manager'] };
    } else if (userName === 'user' && password === 'User@123') {
      return { token: exampleToken, roles: ['User'] };
    } else {
      return { token: null, roles: [] };
    }
  }

  saveSession(token: string, roles: string[]): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRoles(): string[] {
    const roles = localStorage.getItem(this.rolesKey);
    return roles ? JSON.parse(roles) : [];
  }

  isAdmin(): boolean {
    return this.getRoles().includes('Admin');
  }

  isManager(): boolean {
    return this.getRoles().includes('Manager');
  }

  isUser(): boolean {
    return this.getRoles().includes('User');
  }

  // Clear session (useful for logout)
  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
  }
}