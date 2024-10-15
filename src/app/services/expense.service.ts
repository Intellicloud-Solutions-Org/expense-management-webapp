import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ExpenseUtils } from '../shared/utils/expenseType';

interface EmployeeData {
  name: string;
  id: string;
  designation: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  

  private apiUrl = 'api'; 

  getDummyEmployeeData(): Observable<any> {
    return of({
      employeeName: 'John Doe',
      employeeId: 'E12345',
      designation: 'Software Engineer'
    });
  }
  

  constructor(private http: HttpClient) {}
  

  getExpenseType(): Observable<string[]> {
    return of(ExpenseUtils.expenseTypes);
  }

  getManagers(): Observable<string[]> {
    // Dummy data for now
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

