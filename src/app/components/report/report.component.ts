import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';

interface Expense {
  empId: number;
  expenseType: string | undefined;
  receipt: string | null;
  amount: number;
  status: string;
  isEditing?: boolean;  
  tempReceipt?: string | File | null;  
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
      expense.tempReceipt = null;  
    }
  }

  currentEditingExpense: Expense | null = null;

  editExpense(expense: Expense) {
    if (this.currentEditingExpense && this.currentEditingExpense !== expense) {
      this.currentEditingExpense.isEditing = false;
      this.currentEditingExpense.tempReceipt = null;
      this.currentEditingExpense.tempAmount = null;
    }

  this.currentEditingExpense = expense;
  expense.isEditing = true;
  expense.tempReceipt = expense.receipt;
  expense.tempAmount = expense.amount;
}

saveExpense(expense: Expense) {
  expense.receipt = expense.tempReceipt as string;
  expense.amount = expense.tempAmount as number;
  expense.isEditing = false;
  this.currentEditingExpense = null;

  console.log('Saved expense:', expense);
}

cancelEdit(expense: Expense) {
  expense.isEditing = false;
  expense.tempReceipt = null;
  expense.tempAmount = null;
  this.currentEditingExpense = null;
}

deleteExpense(empId: number) {
 
  const expenseToDelete = this.expenses.find(expense => expense.empId === empId);

  if (expenseToDelete && this.currentEditingExpense === expenseToDelete) {
    this.currentEditingExpense = null;
  }
  this.expenses = this.expenses.filter(expense => expense.empId !== empId);
  console.log('Deleted expense with Emp ID:', empId);
}
}
  

