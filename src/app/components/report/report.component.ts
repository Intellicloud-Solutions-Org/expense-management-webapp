import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';

interface Expense {
  empId: number;
  expenseType: string;
  receipt: string | null;
  amount: number;
  status: string;
  isEditing?: boolean;  // Add optional isEditing property
  tempReceipt?: string | File | null;  // Add temporary variables
  tempAmount?: number | null;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ReportService) {}  

  ngOnInit(): void {
    
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data;
    });
  }

  onFileChange(event: Event, expense: Expense): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      expense.tempReceipt = input.files[0];
    } else {
      expense.tempReceipt = null;  // Handle cases where no file is selected
    }
  }

  currentEditingExpense: Expense | null = null;

  editExpense(expense: Expense) {
    // If another expense is currently being edited, cancel its editing mode
    if (this.currentEditingExpense && this.currentEditingExpense !== expense) {
      this.currentEditingExpense.isEditing = false;
      this.currentEditingExpense.tempReceipt = null;
      this.currentEditingExpense.tempAmount = null;
    }

      // Set the current expense as the one being edited
  this.currentEditingExpense = expense;
  expense.isEditing = true;
  expense.tempReceipt = expense.receipt;
  expense.tempAmount = expense.amount;
}

saveExpense(expense: Expense) {
  // Save the changes
  expense.receipt = expense.tempReceipt as string;
  expense.amount = expense.tempAmount as number;
  expense.isEditing = false;

  // Reset the currently editing expense
  this.currentEditingExpense = null;

  console.log('Saved expense:', expense);
}

cancelEdit(expense: Expense) {
  // Cancel the edit
  expense.isEditing = false;
  expense.tempReceipt = null;
  expense.tempAmount = null;

  // Reset the currently editing expense
  this.currentEditingExpense = null;
}

deleteExpense(empId: number) {
 
  const expenseToDelete = this.expenses.find(expense => expense.empId === empId);

  if (expenseToDelete && this.currentEditingExpense === expenseToDelete) {
    this.currentEditingExpense = null;
  }
  // Delete the expense
  this.expenses = this.expenses.filter(expense => expense.empId !== empId);
  console.log('Deleted expense with Emp ID:', empId);
}
}
  




/*
expenses: Expense[] = [
    { empId: 1, expenseType: 'Travel', receipt: null, amount: 150, status: 'Admin Approved' },
    { empId: 2, expenseType: 'Office Supplies', receipt: 'receipt1.pdf', amount: 75, status: 'Completed' },
    { empId: 3, expenseType: 'Meals', receipt: null, amount: 50, status: 'Manager Rejected' },
    // Add more dummy data as needed
  ];

  editExpense(expense: Expense) {
    // Logic to edit the expense and upload receipt if not uploaded
    console.log('Edit expense:', expense);
  }

  deleteExpense(empId: number) {
    // Logic to delete the expense
    this.expenses = this.expenses.filter(expense => expense.empId !== empId);
    console.log('Delete expense with Emp ID:', empId);
  }
    */