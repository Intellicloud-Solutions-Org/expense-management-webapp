import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ExpenseService } from '../../services/expense.service';


@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [FormsModule, CommonModule,  TypeaheadModule ,ReactiveFormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit {
  public asyncSelected: string = ''; 
  public typeaheadLoading: boolean = false; 
  public typeaheadNoResults: boolean = false; 
  public dataSource: string[] = []; 
  public expenseTypes: string[] = []; 
  public defaultDate: string; 

  employeeName: string = '';
  employeeId: string = '';
  designation: string = '';

  receipt: File | null = null;
  expenseForm!: FormGroup; 

  

  constructor(private expenseService: ExpenseService, private fb: FormBuilder ) {
    
    const today = new Date();
    this.defaultDate = today.toISOString().substring(0, 10);
  }

  ngOnInit(): void {

    this.initializeForm();
    
    this.expenseService.getExpenseType().subscribe((types: string[]) => {
      this.expenseTypes = types;
    });

    this.expenseService.getManagers().subscribe(data => {
      this.dataSource = data;
    });

    this.initializeUserData();
  }
  
  private initializeForm() {
    this.expenseForm = this.fb.group({
      //manager: ['', Validators.required],
      expenseType: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      receipt: ['', Validators.required] 
    });
  }

  private initializeUserData() {
    const userInfo = localStorage.getItem('userInfo'); 
    if (userInfo) {
      const parsedData = JSON.parse(userInfo); 
      this.employeeName = `${parsedData.data.firstName} ${parsedData.data.lastName}`;
      this.employeeId = parsedData.data.id; 
      this.designation = parsedData.data.designation; 
    } else {
      console.warn('No userInfo found in local storage.');
    }
  }

  public changeTypeaheadLoading(isLoading: boolean): void {
    this.typeaheadLoading = isLoading;
  }

  public changeTypeaheadNoResults(hasNoResults: boolean): void {
    this.typeaheadNoResults = hasNoResults;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.receipt = event.target.files[0]; // Capture the selected file
    } else {
      this.receipt = null; // If no file is selected, set it to null
    }
  }

  onSubmit() {
    if (this.expenseForm.valid && this.receipt) {
      const formData = new FormData();
     // formData.append('manager', this.expenseForm.get('manager')?.value);
      formData.append('expenseType', this.expenseForm.get('expenseType')?.value);
      formData.append('amount', this.expenseForm.get('amount')?.value);
      formData.append('receipt', this.receipt);
  
    
      this.expenseService.addExpense(formData).subscribe({
        next: response => {
          console.log('Expense added successfully:', response);
          alert('Expense added successfully!');
        },
        error: error => {
          console.error('Error adding expense:', error);
          alert('Failed to add expense. Please try again.');
        }
      });
    }
 }
}


/*  this.initializeFormWithDummyData();
  }
    initializeFormWithDummyData() 
    {
      this.expenseService.getDummyEmployeeData().subscribe(data => {
        this.employeeName = data.employeeName;
        this.employeeId = data.employeeId;
        this.designation = data.designation;
      });
    }

  public changeTypeaheadLoading(isLoading: boolean): void {
    this.typeaheadLoading = isLoading;
  }

  public changeTypeaheadNoResults(hasNoResults: boolean): void {
    this.typeaheadNoResults = hasNoResults;
  }
} 
*/








 