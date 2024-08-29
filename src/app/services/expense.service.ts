import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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

  private employeeData: any;

  setEmployeeData(data: any) {
    this.employeeData = data;
  }

  getEmployeeData() {
    return this.employeeData;
  }

  constructor(private http: HttpClient) {}
  // Simulate HTTP request and return dummy data

  getExpenseTypes(): Observable<string[]> {
    return of(['Travel', 'Team Activities', 'Professional Development', 'Bills']);
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

