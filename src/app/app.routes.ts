import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { ReportComponent } from './components/report/report.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { OfficeExpenseManagementComponent } from './components/office-expense-management/office-expense-management.component';
import { AdminTaskComponent } from './components/admin-task/admin-task.component'
import { authGuard } from '../app/services/auth/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard], 
        data: { roles: ['Admin', 'Manager', 'User'] } 
      },
      {
        path: 'expense',
        component: ExpenseComponent,
        canActivate: [authGuard], 
        data: { roles: ['Admin', 'Manager', 'User'] } 
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [authGuard], 
        data: { roles: ['Admin', 'Manager', 'User'] } 
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [authGuard], 
        data: { roles: ['Admin', 'Manager', 'User'] } 
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard], 
        data: { roles: ['Admin'] } 
      },
      {
        path: 'office-expense',
        component: OfficeExpenseManagementComponent,
        canActivate: [authGuard], 
        data: { roles: ['Admin'] }
      },
      {
        path: 'adminTask',
        component: AdminTaskComponent,
        canActivate: [authGuard], 
        data: { roles: ['Admin'] }
      }
    ],
  },
];
