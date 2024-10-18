import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private apiUrl = 'http://localhost:8080'; 


  getUserInfo(): Observable<any> {
    return of ({
      companyName: 'ABC Corp',
      designation: 'Software Engineer',
      userName: 'johndoe',
      email: 'johndoe@abc.com'
    }); 
}
  }

