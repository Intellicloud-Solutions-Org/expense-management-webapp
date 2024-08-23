import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';

interface Expense {
  empId: number;
  expenseType: string;
  receipt: string | null;
  amount: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  getExpenses(): Observable<Expense[]> {

    const dummyExpenses: Expense[] = [
      { empId: 1, expenseType: 'Travel', receipt: null, amount: 150, status: 'Admin Approved' },
      { empId: 2, expenseType: 'Team Activities', receipt: 'receipt1.pdf', amount: 75, status: 'Completed' },
      { empId: 3, expenseType: 'Meals', receipt: null, amount: 50, status: 'Manager Rejected' }
    ];

    return of(dummyExpenses); 
  }
}
