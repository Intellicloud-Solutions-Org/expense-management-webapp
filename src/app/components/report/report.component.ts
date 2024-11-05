import { ChangeDetectorRef, Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { Router } from '@angular/router';
//import { ExpenseService } from '../../services/expense.service';

interface Expense {
  id: number;
  expenseType: string | undefined;
  receipts: string | null;
  expenseAmount: string;
  status: string;
  createdAt: string;
  isEditing?: boolean;  
  tempReceipt?: string | File | null;
  tempAmount?: string | null;
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

  constructor(private cdref:ChangeDetectorRef, private router:Router, private reportService: ReportService) { }

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
    expense.tempAmount = expense.expenseAmount;
  }

  saveExpense(expense: Expense): void {
    const formData = new FormData();
  
    // Append expense properties to FormData
    formData.append('receipts', expense.tempReceipt as string);
    formData.append('expenseAmount', expense.tempAmount as string);
    formData.append('expenseType',expense.expenseType as string);
    formData.append('isEditing', 'false');
    formData.append('createdAt',expense.createdAt);
    formData.append('id', expense.id.toString());
  
    this.reportService.updateExpense(formData).subscribe({
      next: (updatedExpense: any) => {
        const index = this.expenses.findIndex(e => e.id === updatedExpense.id);
        if (index !== -1) {
          this.expenses[index] = updatedExpense;
        }
        this.currentEditingExpense = null;
        console.log('Expense updated successfully:', updatedExpense);
        alert("Expense updated successfully");
        expense.isEditing=false;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['report']);
      })},

      error: (err) => {
        console.error('Failed to save expense:', err);
        alert('Failed to save the expense. Please try again.');
      }
    });
  }


  // saveExpense(expense: Expense, id: number): void {
  //   const formData = new FormData();
  //   formData.append('expenseAmount', expense.tempAmount?.toString() ?? '');
  //   formData.append('expenseType', expense.expenseType ?? '');
  //   formData.append('receipts', expense.receipts ?? '');
  //   //formData.append('status', expense.status ?? '');
  //   //formData.append('id', expense.id);

  
  //   if (expense.tempReceipt instanceof File) {
  //     formData.append('receipts', expense.tempReceipt); // Append file if present
  //   }
  
  //   this.reportService.updateExpense(formData, id).subscribe({
  //     next: (updatedExpense: Expense) => {
  //       const index = this.expenses.findIndex(e => e.id === updatedExpense.id);
  //       if (index !== -1) {
  //         this.expenses[index] = updatedExpense;
  //       }
  //       this.currentEditingExpense = null;
  //       console.log('Expense updated successfully:', updatedExpense);
  //     },
  //     error: (err) => {
  //       console.error('Failed to save expense:', err);
  //       alert('Failed to save the expense. Please try again.');
  //     }
  //   });
  // }


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
  
