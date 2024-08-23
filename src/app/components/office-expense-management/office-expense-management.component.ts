import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { OfficeExpenseService } from '../../services/office-expense.service';



@Component({
  selector: 'app-office-expense-management',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './office-expense-management.component.html',
  styleUrl: './office-expense-management.component.css'
})
export class OfficeExpenseManagementComponent implements OnInit {

    data: any[] = [];
    p: number = 1; // Current page for pagination
  
    constructor(private officeExpenseService: OfficeExpenseService) { }
  
    ngOnInit(): void {
      this.officeExpenseService.getExpenses().subscribe((expenses) => {
        this.data = expenses;
      });
    }
  
    selectAll(event: any) {
      const checked = event.target.checked;
      this.data.forEach((item) => (item.selected = checked));
    }

  approve(data: any) {
    // Send email via EmailJS
    emailjs.send("service_1rl00md", "template_z1dhwb3", {
      emp_name: data.empName,
      submission_date: data.submissionDate,
      expense_type: data.expenseType,
      amount: data.amount,
      receipt: data.receipt,
      comments: data.comments,
    }, "sLQgz1t8GTy1GCl20").then((response: EmailJSResponseStatus) => {
      console.log('Email sent successfully', response.status, response.text);
      data.approvalStatus = 'Approved';
    }, (error) => {
      console.error('Failed to send email', error);
    });
  }

  approveSelected() {
    const selectedItems = this.data.filter(item => item.selected);
    selectedItems.forEach(item => this.approve(item));
    
  }

  reject(data: any) {
    emailjs.send("service_1rl00md", "template_rkr0sph", {
      emp_name: data.empName,
      submission_date: data.submissionDate,
      expense_type: data.expenseType,
      amount: data.amount,
      receipt: data.receipt,
      comments: data.comments,
    }, "sLQgz1t8GTy1GCl20")
    .then((response: EmailJSResponseStatus) => {
      console.log('Rejection email sent successfully', response.status, response.text);
      data.approvalStatus = 'Rejected';
    }, (error) => {
      console.error('Failed to send rejection email', error);
    });
  }

  rejectSelected() {
    const selectedItems = this.data.filter(item => item.selected);
    selectedItems.forEach(item => this.reject(item));
    
  }
}

 /* approve(item: any) {
    // Handle approval logic here
    console.log('Approved:', item);
    item.approvalStatus = 'Approved';
  }

  reject(item: any) {
    // Handle rejection logic here
    console.log('Rejected:', item);
    item.approvalStatus = 'Rejected';
  }
}
  */


