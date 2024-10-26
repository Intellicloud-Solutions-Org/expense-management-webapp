import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { ExpenseService } from '../../services/expense.service';
//import { ExpenseComponent } from '../../components/expense/expense.component';

interface Expense {
  id: number;
  expenseType: string | undefined;
  receipts: string | null;
  expenseAmount: number;
  status: string;
  isEditing?: boolean;  
 tempReceipt?: string | File | null
  //tempReceipt?: File[] | null;
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
  currentEditingExpense: Expense | null = null;
  expenseCount: number = 0;

  constructor(private expenseService: ExpenseService, private reportService: ReportService) { }  // Inject the ExpenseService

  ngOnInit(): void {
    this.fetchExpenses();  // Fetch expenses from the backend when the component initializes
  }

  fetchExpenses(): void {
    this.reportService.getExpenses().subscribe({
      next: (response: any) => {
        this.expenses = response.data;
        this.expenseCount = this.expenses.length;
      },
      error: (err) => {
        console.error('Failed to fetch expenses:', err);
      }
    });
  }

  onFileChange(event: Event, expense: Expense): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      expense.tempReceipt = input.files[0];
      //expense.tempReceipt = Array.from(input.files);
    } else {
      expense.tempReceipt = null;  
    }
  }

  editExpense(expense: Expense): void {
    if (this.currentEditingExpense && this.currentEditingExpense !== expense) {
      this.currentEditingExpense.isEditing = false;
      this.currentEditingExpense.tempReceipt = null;
      this.currentEditingExpense.tempAmount = null;
    }

    this.currentEditingExpense = expense;
    expense.isEditing = true;
    expense.tempReceipt = expense.receipts;
   // expense.tempReceipt = []; 
    expense.tempAmount = expense.expenseAmount;
  }

  saveExpense(expense: Expense): void {
    expense.receipts = expense.tempReceipt as string;
    expense.expenseAmount = expense.tempAmount as number;
    expense.isEditing = false;

    this.reportService.updateExpense(expense).subscribe({
      next: (updatedExpense: Expense) => {
      
        const index = this.expenses.findIndex(e => e.id === updatedExpense.id);
        if (index !== -1) {
          this.expenses[index] = updatedExpense;
        }
        this.currentEditingExpense = null;
        console.log('Expense updated successfully:', updatedExpense);
      },
      error: (err) => {
        console.error('Failed to save expense:', err);
        alert('Failed to save the expense. Please try again.');
      }
    });
   }

  cancelEdit(expense: Expense): void {
    expense.isEditing = false;
    expense.tempReceipt = null;
    expense.tempAmount = null;
    this.currentEditingExpense = null;
  }

  deleteExpense(id: number): void {
    this.reportService.deleteExpense(id).subscribe({
      next: () => {
        const expenseToDelete = this.expenses.find(expense => expense.id === id);
        if (expenseToDelete && this.currentEditingExpense === expenseToDelete) {
          this.currentEditingExpense = null;
        }

      
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        console.log('Deleted expense with Emp ID:', id);
         
      },
      error: (err) => {
        console.error('Failed to delete expense:', err);
        alert('Failed to delete the expense. Please try again.');
      }
    });
  } 
}
  
