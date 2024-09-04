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
import { initializeExpenseData, initializeUserData } from '../app/app-init';
import { ExpenseService } from './services/expense.service';
import { UserService } from '../app/services/user.service';





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
    NgxPaginationModule
  ],

  providers: [
    ExpenseService,
    UserService, 
    {
      provide: APP_INITIALIZER,
      useFactory: initializeExpenseData,
      deps: [ExpenseService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUserData,
      deps: [UserService],
      multi: true,
    },
  ],
})
export class AppModule {}
