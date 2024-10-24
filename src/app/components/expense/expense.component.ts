import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, FormControl } from '@angular/forms';
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

  expenseForm: FormGroup;

  

  constructor(private expenseService: ExpenseService, private fb: FormBuilder ) {
    
    const today = new Date();
    this.defaultDate = today.toISOString().substring(0, 10);

    this.expenseForm = this.fb.group({
      employeeName: [{ value: '', disabled: true }, Validators.required],
      employeeId: [{ value: '', disabled: true }, Validators.required],
      designation: [{ value: '', disabled: true }, Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {

    //this.initializeForm();

    this.initializeUserData(); // Populate user data when the component initializes
  }

       // Populate employee fields from local storage or other source
       private initializeUserData(): void {
        const userInfo = localStorage.getItem('userInfo'); 
        if (userInfo) {
          const parsedData = JSON.parse(userInfo); 
          this.expenseForm.patchValue({
            employeeName: `${parsedData.data.firstName} ${parsedData.data.lastName}`,
            employeeId: parsedData.data.id,
            designation: parsedData.data.designation,
          });
        }

       // private initializeUserData() {
  //   const userInfo = localStorage.getItem('userInfo'); 
  //   if (userInfo) {
  //     const parsedData = JSON.parse(userInfo); 
  //     this.employeeName = `${parsedData.data.firstName} ${parsedData.data.lastName}`;
  //     this.employeeId = parsedData.data.id; 
  //     this.designation = parsedData.data.designation; 

    
    this.expenseService.getExpenseType().subscribe((types: string[]) => {
      this.expenseTypes = types;
    });

    // this.expenseService.getManagers().subscribe(data => {
    //   this.dataSource = data;
    // });
  }
    //this.initializeUserData();

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
  
  // private initializeForm() {
  //   this.expenseForm = this.fb.group({
  //     //manager: ['', Validators.required],
  //     expenseType: ['', Validators.required],
  //     amount: ['', [Validators.required, Validators.min(0)]],
  //     receipt: ['', Validators.required] 
  //   });
  

  // private initializeUserData() {
  //   const userInfo = localStorage.getItem('userInfo'); 
  //   if (userInfo) {
  //     const parsedData = JSON.parse(userInfo); 
  //     this.employeeName = `${parsedData.data.firstName} ${parsedData.data.lastName}`;
  //     this.employeeId = parsedData.data.id; 
  //     this.designation = parsedData.data.designation; 

  //   // // Disable the form controls
  //   // this.expenseForm.get('employeeName')?.disable();
  //   // this.expenseForm.get('employeeId')?.disable();
  //   // this.expenseForm.get('designation')?.disable();
    
  //   } else {
  //     console.warn('No userInfo found in local storage.');
  //   }
  // }

  

  


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








 