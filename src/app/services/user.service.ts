import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private apiUrl = 'api'; // Replace with your API endpoint

  getUserInfo(): Observable<any> {
    return of ({
      companyName: 'ABC Corp',
      designation: 'Manager',
      userName: 'johndoe',
      email: 'johndoe@abc.com'
    }); // Simulating an HTTP call
}
  }

