import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DateUtils } from '../shared/utils/date';
import { ExpenseUtils } from '../shared/utils/expenseType';
import { AmountUtils } from '../shared/utils/Amount';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'api'; 

  constructor(private http: HttpClient) { }


  getDashboardData(): Observable<any> {
  
    const dummyData = {
      data1: {
        labels: ["Travel", "Team Activities", "Professional Development", "Bills"],
        datasets: [{
          data: [1000, 200, 300, 150]
        }]
      },
      data2: {
        labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
        datasets: [
          {
            label: "Travel",
            data: [ 500,  950,  100, 150]
          },
          {
            label: "Team Activities",
            data: [ 210, 210,  210,  220]
          },
          {
            label: "Professional Development",
            data: [ 310, 320, 330, 320]
          },
          {
            label: "Bills",
            data: [ 170, 160, 170, 180]
          }
        ]
      },
  };
    return of(dummyData).pipe(delay(1000));
  }

  getTableData()
    : Observable<any> { 
    const employeeStatusData = [
      {
        expenseType: ExpenseUtils.getExpenseType('Professional Development'),
        amount: AmountUtils.formatAmount(1234.56),
        Approval: "Pending"
      },
      {
        expenseType: ExpenseUtils.getExpenseType('Bills'),
        amount: AmountUtils.formatAmount(1234.56),
        Approval: "Pending"
      },
      {
        expenseType: ExpenseUtils.getExpenseType('Travel'),
        amount: AmountUtils.formatAmount(1234.56),
        Approval: "Pending"
      },
      {
        expenseType: ExpenseUtils.getExpenseType('Team Activities') ,
        amount: AmountUtils.formatAmount(1234.56),
        Approval: "Pending"
      }
    ];
    return of (employeeStatusData)
  }
  
    getRequestTableData()
    : Observable<any> { 
    const teamApprovalRequestsData = [
      {
        empName: 'John Doe',
        expenseType: ExpenseUtils.getExpenseType('Team Activities'),
        amount: AmountUtils.formatAmount(1234.56),
        submissionDate: DateUtils.formatDate(new Date('2024-08-17')),
        receipt: 'receipt1.pdf',
        comments: '',
      },
      {
        empName: 'Jane Smith',
        expenseType: ExpenseUtils.getExpenseType('Travel'),
        amount: AmountUtils.formatAmount(1234.56),
        submissionDate: DateUtils.formatDate(new Date('2024-08-17')),
        receipt: 'receipt2.pdf',
        comments: '',
      },
      {
        empName: 'Bob Johnson',
        expenseType: ExpenseUtils.getExpenseType('Professional Development'),
        amount: AmountUtils.formatAmount(1234.56),
        submissionDate: DateUtils.formatDate(new Date('2024-08-17')),
        receipt: 'receipt3.pdf',
        comments: '',
      },
      {
        empName: 'Alice Aloy',
        expenseType: ExpenseUtils.getExpenseType('Bills'),
        amount: AmountUtils.formatAmount(1234.56),
        submissionDate: DateUtils.formatDate(new Date('2024-08-17')),
        receipt: 'receipt4.pdf',
        comments: '',
      }
    ];
    return of (teamApprovalRequestsData)
    }
  }
