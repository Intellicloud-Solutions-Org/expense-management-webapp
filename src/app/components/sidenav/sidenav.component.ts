import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '/Angular/expense-management-webapp/src/app/services/auth/auth.service';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterLink, MatSidenavModule, RouterOutlet, CommonModule ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit  {

  isExpanded = true; // Default state of sidenav
  isAdmin = false;
  isManager = false;
  isUser = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isManager = this.authService.isManager();
    this.isUser = this.authService.isUser();
  }

  toggleSidebar() : void {
    this.isExpanded = !this.isExpanded;
  }

  routeToAdminDashboard(): void {
    if (this.isAdmin) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      alert('Access denied. Not an admin.');
    }
  }

  routeToUserDashboard(): void {
    if (this.isUser || this.isManager) { // Both user and manager will access the user dashboard
      this.router.navigate(['/dashboard']);
    } else {
      alert('Access denied.');
    }
  }
}

