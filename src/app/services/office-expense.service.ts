import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DateUtils } from '../shared/utils/date';
import { ExpenseUtils } from '../shared/utils/expenseType';
import { AmountUtils } from '../shared/utils/Amount';

@Injectable({
  providedIn: 'root'
})
export class OfficeExpenseService {

  constructor() { }

  getExpenses(): Observable<any[]> {
    const data = [
      { empName: 'Aman Sehgal', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'John Doe', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Travel'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Jane Smith', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Team Activities'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Alice Johnson', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Professional Development'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Bob Brown', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: DateUtils.formatDate(new Date('2024-08-15')), expenseType: ExpenseUtils.getExpenseType('Bills'), amount: AmountUtils.formatAmount(1234.56), receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      
    ];
    return of(data);
  }
}
