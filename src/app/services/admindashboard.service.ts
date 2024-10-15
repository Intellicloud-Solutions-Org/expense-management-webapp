import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DateUtils } from '../shared/utils/date';
import { ExpenseUtils } from '../shared/utils/expenseType';
import { AmountUtils } from '../shared/utils/Amount';


@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {

  private apiUrl = 'api'; 

  constructor(private http: HttpClient) { }

  getLineChartData(): Observable<any> {
    const mockData = {
      labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec'
      ],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40, 60, 43, 24,34, 12],
          label: 'Monthly Expenses', 
        }
      ]
    };
    return of(mockData);
}
getPieChartData(): Observable<any> {
  const mockPieData = {
    labels: ["Travel", "Team Activities", "Professional Development", "Bills"],
    datasets: [
      {
        data: [300, 500, 100, 600],
        backgroundColor: ["#0e8174", "#10c4b5", "#6eba8c", "#005562"] 
      }
    ]
  };
  return of(mockPieData); 
}

  getEmployeeData(): Observable<any[]> {
    const mockEmployeeData = [
      { employeeName: 'John Doe', expenseType: ExpenseUtils.getExpenseType('Professional Development'), submissionDate: DateUtils.formatDate(new Date('2024-08-17')), amount: AmountUtils.formatAmount(1234.56), status: 'Approved' },
      { employeeName: 'Jane Smith', expenseType: ExpenseUtils.getExpenseType('Bills'), submissionDate: DateUtils.formatDate(new Date('2024-08-17')), amount: AmountUtils.formatAmount(1234.56), status: 'Pending' },
      { employeeName: 'Alice Johnson', expenseType: ExpenseUtils.getExpenseType('Team Activities'), submissionDate: DateUtils.formatDate(new Date('2024-08-17')), amount: AmountUtils.formatAmount(1234.56), status: 'Approved' },
      { employeeName: 'Bob Brown', expenseType: ExpenseUtils.getExpenseType('Travel'), submissionDate: DateUtils.formatDate(new Date('2024-08-17')), amount: AmountUtils.formatAmount(1234.56), status: 'Rejected' }
    ];
    return of(mockEmployeeData); 
  }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}


