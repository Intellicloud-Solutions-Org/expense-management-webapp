import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private mockToken: string = 'mock-jwt-token';

  login(userName: string, password: string): string | null {
    
    const storedUsers = JSON.parse(localStorage.getItem('angular18Local') || '[]');
    const user = storedUsers.find(
      (user: any) => user.userName === userName && user.password === password
    );

    if (user) {
      return this.mockToken;
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}