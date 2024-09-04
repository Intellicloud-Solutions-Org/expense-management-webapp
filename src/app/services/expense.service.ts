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
  

  private apiUrl = 'api'; // Replace with your API endpoint

  private expenses: any[] = [];

  setExpenses(expenses: any[]) {
    this.expenses = expenses;
  }

  getExpenses() {
    return this.expenses;
  }

  private employeeData: EmployeeData | null = null;

  setEmployeeData(data: EmployeeData) {
    this.employeeData = data;
  }

  getEmployeeData(): EmployeeData | null {
    return this.employeeData;
  }


  constructor(private http: HttpClient) {}
  // Simulate HTTP request and return dummy data

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

