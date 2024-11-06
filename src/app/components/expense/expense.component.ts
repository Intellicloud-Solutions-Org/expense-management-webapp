import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ExpenseService } from '../../services/expense.service';
import { LoginPopupsComponent } from '../login-popups/login-popups.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [FormsModule, CommonModule,  TypeaheadModule ,ReactiveFormsModule, LoginPopupsComponent ,  RouterModule  ],
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
  receipts: File | null = null;

  expenseForm: FormGroup;

   // Popup variables
   showPopup: boolean = false;
   popupTitle: string = '';
   popupMessage: string = '';


  constructor(private expenseService: ExpenseService, private fb: FormBuilder , private route : Router ) {
    
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
  }

    public changeTypeaheadLoading(isLoading: boolean): void {
      this.typeaheadLoading = isLoading;
    }
  
    public changeTypeaheadNoResults(hasNoResults: boolean): void {
      this.typeaheadNoResults = hasNoResults;
    }
  
    onFileSelected(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        this.receipts = event.target.files[0]; 
      } else {
        this.receipts= null;
      }
    }

    onSubmit() {
      if (this.expenseForm.valid && this.receipts) {
        const formData = new FormData();
       // formData.append('manager', this.expenseForm.get('manager')?.value);
        formData.append('expenseType', this.expenseForm.get('expenseType')?.value);
        formData.append('expenseAmount', this.expenseForm.get('expenseAmount')?.value);
        formData.append('receipts', this.receipts);
    
      
        this.expenseService.addExpense(formData).subscribe({
          next: (response) => {
            this.popupTitle = 'Expense Added';
            this.popupMessage = 'Expense added successfully!';
            this.showPopup = true;
          },
          error: (error) => {
            this.popupTitle = 'Expense Failed';
            this.popupMessage = 'Failed to add expense. Please try again.';
            this.showPopup = true;
          }
        });
      }
   }

   onPopupClose() {
    this.showPopup = false;
    if (this.popupTitle === 'Expense Added') {
      this.route.navigate(['report']);
    }
  }
  }
  
 






 