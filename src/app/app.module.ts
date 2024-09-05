import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExpenseService } from './services/expense.service';
import { UserService } from '../app/services/user.service';
import { LoginPopupsComponent } from './components/login-popups/login-popups.component';


export function initializeExpense(expenseService: ExpenseService): () => Promise<any> {
  return () => {
    return expenseService.getDummyEmployeeData().toPromise().then(data => {
      // Store the data for later use
      localStorage.setItem('employeeData', JSON.stringify(data));
    });
  };
}

export function initializeUser(userService: UserService): () => Promise<any> {
  return () => {
    return userService.getUserInfo().toPromise().then(data => {
      // Store the data for later use
      localStorage.setItem('userInfo', JSON.stringify(data));
    });
  };
}

@NgModule({
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    LoginPopupsComponent 
  ],

  providers: [ExpenseService, UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeExpense,
      deps: [ExpenseService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUser,
      deps: [UserService],
      multi: true // Allows multiple initializers
    }
  ],
})
export class AppModule {}
