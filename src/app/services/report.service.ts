import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';
//import { ExpenseUtils } from '../shared/utils/expenseType';

interface Expense {
  id: number;
  expenseType: string | undefined;
  receipts: string | null;
  expenseAmount: number;
  status: string;
}

//updateExpense: FormData;

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:8080/expense';


 //  http://localhost:8080/expense/add  Method: Post for add expense
//  http://localhost:8080/expense/getExpenses  Method: Get for getting all expense
//  http://localhost:8080/expense/updateExpense  Method: Put For Updating expense
//  http://localhost:8080/expense/delete/{id}  Method: Delete For Deleting expense

constructor(private http: HttpClient) { }

getExpenses(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/getExpenses`);
}

updateExpense(expense: FormData): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/updateExpense`, expense)
}

deleteExpense(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
}
}