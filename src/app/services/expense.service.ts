import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'api'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}
  // Simulate HTTP request and return dummy data

  getExpenseTypes(): Observable<string[]> {
    return of(['Travel', 'Team Activities', 'Professional Development', 'Bills']);
  }
    //return this.http.get<string[]>(this.apiUrl);
  }

