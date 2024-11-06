import { ChangeDetectorRef, Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { Router } from '@angular/router';
import { LoginPopupsComponent } from '../login-popups/login-popups.component';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule,  LoginPopupsComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {


  expenses: Expense[] = [];
  currentEditingExpense: Expense | null = null;
  expenseCount: number = 0;


  // Popup variables
  showPopup: boolean = false;
  popupTitle: string = '';
  popupMessage: string = '';

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
        this.popupTitle = 'Error';
        this.popupMessage = 'Failed to fetch expenses. Please try again.';
        this.showPopup = true;
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
        this.popupTitle = 'Success';
        this.popupMessage = 'Expense updated successfully!';
        this.showPopup = true;
        expense.isEditing = false;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['report']);
      })},

      error: (err) => {
        this.popupTitle = 'Error';
        this.popupMessage = 'Failed to save the expense. Please try again.';
        this.showPopup = true;
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
        this.popupTitle = 'Success';
        this.popupMessage = 'Expense deleted successfully!';
        this.showPopup = true;
      },
      error: (err) => {
        this.popupTitle = 'Error';
        this.popupMessage = 'Failed to delete the expense. Please try again.';
        this.showPopup = true;
      }
    });
  } 

  onPopupClose() {
    this.showPopup = false;
  }
}
  
