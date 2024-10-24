import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { ExpenseService } from '../../services/expense.service';

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
  currentEditingExpense: Expense | null = null;

  constructor(private expenseService: ExpenseService, private reportService: ReportService) { }  // Inject the ExpenseService

  ngOnInit(): void {
    this.fetchExpenses();  // Fetch expenses from the backend when the component initializes
  }

  fetchExpenses(): void {
    this.reportService.getExpenses().subscribe({
      next: (data: Expense[]) => {
        this.expenses = data;
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
    expense.tempReceipt = expense.receipt;
    expense.tempAmount = expense.amount;
  }

  saveExpense(expense: Expense): void {
    expense.receipt = expense.tempReceipt as string;
    expense.amount = expense.tempAmount as number;
    expense.isEditing = false;

    this.reportService.updateExpense(expense).subscribe({
      next: (updatedExpense: Expense) => {
      
        const index = this.expenses.findIndex(e => e.empId === updatedExpense.empId);
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

  deleteExpense(empId: number): void {
    this.reportService.deleteExpense(empId).subscribe({
      next: () => {
        const expenseToDelete = this.expenses.find(expense => expense.empId === empId);
        if (expenseToDelete && this.currentEditingExpense === expenseToDelete) {
          this.currentEditingExpense = null;
        }

      
        this.expenses = this.expenses.filter(expense => expense.empId !== empId);
        console.log('Deleted expense with Emp ID:', empId);
      },
      error: (err) => {
        console.error('Failed to delete expense:', err);
        alert('Failed to delete the expense. Please try again.');
      }
    });
  }

  
}
  
//   expenses: Expense[] = [];

//   constructor(private expenseService: ReportService) {}  

//   ngOnInit(): void {
    
  
//   }

//   onFileChange(event: Event, expense: Expense): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       expense.tempReceipt = input.files[0];
//     } else {
//       expense.tempReceipt = null;  
//     }
//   }

//   currentEditingExpense: Expense | null = null;

//   editExpense(expense: Expense) {
//     if (this.currentEditingExpense && this.currentEditingExpense !== expense) {
//       this.currentEditingExpense.isEditing = false;
//       this.currentEditingExpense.tempReceipt = null;
//       this.currentEditingExpense.tempAmount = null;
//     }

//   this.currentEditingExpense = expense;
//   expense.isEditing = true;
//   expense.tempReceipt = expense.receipt;
//   expense.tempAmount = expense.amount;
// }

// saveExpense(expense: Expense) {
//   expense.receipt = expense.tempReceipt as string;
//   expense.amount = expense.tempAmount as number;
//   expense.isEditing = false;
//   this.currentEditingExpense = null;

//   console.log('Saved expense:', expense);
// }

// cancelEdit(expense: Expense) {
//   expense.isEditing = false;
//   expense.tempReceipt = null;
//   expense.tempAmount = null;
//   this.currentEditingExpense = null;
// }

// deleteExpense(empId: number) {
 
//   const expenseToDelete = this.expenses.find(expense => expense.empId === empId);

//   if (expenseToDelete && this.currentEditingExpense === expenseToDelete) {
//     this.currentEditingExpense = null;
//   }
//   this.expenses = this.expenses.filter(expense => expense.empId !== empId);
//   console.log('Deleted expense with Emp ID:', empId);
// }
// }
  
