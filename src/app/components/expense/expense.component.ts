import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  public expenseType: string[] = []; 
  public expenseAmount: number | undefined; 
  public defaultDate: string; 

  employeeName: string = '';
  employeeId: string = '';
  designation: string = '';

  uploadReceipt: File | null = null;

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

    
    this.expenseService.getExpenseType().subscribe((types: string[]) => {
      this.expenseType = types;
    });

    // this.expenseService.getManagers().subscribe(data => {
    //   this.dataSource = data;
    // });
  }

    public changeTypeaheadLoading(isLoading: boolean): void {
      this.typeaheadLoading = isLoading;
    }
  
    public changeTypeaheadNoResults(hasNoResults: boolean): void {
      this.typeaheadNoResults = hasNoResults;
    }
  
    onFileSelected(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        this.uploadReceipt = event.target.files[0]; 
      } else {
        this.uploadReceipt= null;
      }
    }

    onSubmit() {
      if (this.expenseForm.valid && this.uploadReceipt) {
        const formData = new FormData();
       // formData.append('manager', this.expenseForm.get('manager')?.value);
        formData.append('expenseType', this.expenseForm.get('expenseType')?.value);
        formData.append('expenseAmount', this.expenseForm.get('expenseAmount')?.value);
        formData.append('uploadReceipt', this.uploadReceipt);
    
      
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
  
 






 