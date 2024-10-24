import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';
//import { ExpenseUtils } from '../shared/utils/expenseType';

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

  private apiUrl = 'http://localhost:8080/expenses';


 //  http://localhost:8080/expense/add  Method: Post for add expense
//  http://localhost:8080/expense/getExpenses  Method: Get for getting all expense
//  http://localhost:8080/expense/updateExpense  Method: Put For Updating expense
//  http://localhost:8080/expense/delete/{id}  Method: Delete For Deleting expense

constructor(private http: HttpClient) { }

getExpenses(): Observable<Expense[]> {
  return this.http.get<Expense[]>(`${this.apiUrl}/getExpenses`);
}

updateExpense(expense: Expense): Observable<Expense> {
  return this.http.put<Expense>(`${this.apiUrl}/updateExpense`, expense);
}

deleteExpense(empId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/delete/${empId}`);
}
}