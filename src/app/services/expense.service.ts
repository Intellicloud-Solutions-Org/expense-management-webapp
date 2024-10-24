import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ExpenseUtils } from '../shared/utils/expenseType';

// interface EmployeeData {
//   name: string;
//   id: string;
//   designation: string;
// }

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  private apiUrl = 'http://localhost:8080/expense/add';

  constructor(private http: HttpClient) {}

 

 addExpense(expenseData: FormData): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, expenseData); 
}
  

  getExpenseType(): Observable<string[]> {
    return of(ExpenseUtils.expenseTypes);
  }

  getManagers(): Observable<string[]> {
    const managers = [
      'Alice Johnson',
      'Bob Smith',
      'Charlie Brown',
      'Diana Prince',
      'Edward Norton',
      'Fiona Gallagher',
      'George Clooney'
    ];
    return of(managers); 
  }
  }



   // getCurrentUser(): Observable<{ username: string, designation: string }> {
  //   // Get the token from localStorage
  //   const token = localStorage.getItem('jwtToken');

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}` 
  //   });

  //   return this.http.get<{ username: string, designation: string }>(this.apiUrl, { headers });
  // }