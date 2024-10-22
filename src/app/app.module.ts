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
import { UserProfileService } from '../app/services/user-profile.service';
import { LoginPopupsComponent } from './components/login-popups/login-popups.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from '../app/services/auth/jwt.interceptor';


export function initializeExpense(expenseService: ExpenseService): () => Promise<any> {
  return () => {
    return expenseService.getDummyEmployeeData().toPromise().then(data => {
      // Store the data for later use
      localStorage.setItem('employeeData', JSON.stringify(data));
    });
  };
}

export function initializeUser(userService: UserProfileService): () => Promise<any> {
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

  providers: [ExpenseService, UserProfileService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeExpense,
      deps: [ExpenseService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUser,
      deps: [UserProfileService],
      multi: true // Allows multiple initializers
    },
    //provideHttpClient(withInterceptors([jwtInterceptor]))
    {
      provide: HTTP_INTERCEPTORS,
      useValue: jwtInterceptor,
      multi: true
    }

  ],
})
export class AppModule {}
