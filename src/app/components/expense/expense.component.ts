import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ExpenseService } from '../../services/expense.service';

interface EmployeeData {
  name: string;
  id: string;
  designation: string;
}

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [FormsModule, CommonModule,  TypeaheadModule ,ReactiveFormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit {
  public asyncSelected: string = ''; // Initialize with an empty string
  public typeaheadLoading: boolean = false; // Initial value set to false
  public typeaheadNoResults: boolean = false; // Initial value set to false
  public dataSource: string[] = []; // Simplified type declaration

  public expenseTypes: string[] = []; 
  public defaultDate: string; // Declare defaultDate
  
  employeeName: string = '';
  employeeId: string = '';
  designation: string = '';
  


  constructor(private expenseService: ExpenseService) {
    const today = new Date();
    this.defaultDate = today.toISOString().substring(0, 10);
  }

  ngOnInit(): void {
    
    this.expenseService.getExpenseType().subscribe((types: string[]) => {
      this.expenseTypes = types;
    });

    this.expenseService.getManagers().subscribe(data => {
      this.dataSource = data;
    });
    
    this.initializeFormWithDummyData();
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

  









  /*
  public asyncSelected!: string; // Use definite assignment assertion
  public typeaheadLoading: boolean = false; // Provide an initial value
  public typeaheadNoResults: boolean = false; // Provide an initial value
  public dataSource: Array<string> = ['Admin', 'Manager', 'Kritika'];

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  

  public defaultDate: string;

  constructor() {
    const today = new Date();
    this.defaultDate = today.toISOString().substring(0, 10);
  }
  
}*/

