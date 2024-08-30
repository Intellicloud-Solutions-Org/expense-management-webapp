import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';
import { ExpenseUtils } from '../shared/utils/expenseType';

interface Expense {
  empId: number;
  expenseType: string | undefined;
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
      { empId: 1, expenseType: ExpenseUtils.getExpenseType('Bills'), receipt: null, amount: 150, status: 'Admin Approved' },
      { empId: 2, expenseType: ExpenseUtils.getExpenseType('professional development'), receipt: 'receipt1.pdf', amount: 75, status: 'Completed' },
      { empId: 3, expenseType: ExpenseUtils.getExpenseType('Team Activities'), receipt: null, amount: 50, status: 'Manager Rejected' },
      { empId: 4, expenseType: ExpenseUtils.getExpenseType('Travel'), receipt: null, amount: 150, status: 'Manager Rejected' }
    ];

    return of(dummyExpenses); 
  }
}
