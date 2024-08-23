import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficeExpenseService {

  constructor() { }

  getExpenses(): Observable<any[]> {
    const data = [
      { empName: 'Aman Sehgal', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'John Doe', submissionDate: new Date('2023-08-16'), expenseType: 'Travel', amount: 145, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Jane Smith', submissionDate: new Date('2023-08-16'), expenseType: 'Team Activities', amount: 450, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Alice Johnson', submissionDate: new Date('2023-08-16'), expenseType: '	Professional Development', amount: 405, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Bob Brown', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      { empName: 'Aman', submissionDate: new Date('2023-08-16'), expenseType: 'Bills', amount: 45, receipt: 'No Receipt', approvalStatus: 'Pending', comments: '' },
      
      // Add more items here
    ];
    return of(data);
  }
}
