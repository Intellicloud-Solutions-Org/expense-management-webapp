import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterLink, MatSidenavModule, RouterOutlet, CommonModule ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent  {

  constructor(private router: Router) {}
  isExpanded = true; // Default state of sidenav
  isAdmin = false; // Toggle this based on app's logic

  toggleSidebar() : void {
    this.isExpanded = !this.isExpanded;
  }

  adminClicked(): void {
    this.isAdmin = !this.isAdmin;  // Toggle between admin view and default view
    this.router.navigate(['/admin-dashboard']); // To route to Admin Dashboard
  }

  routeToUserDashboard() : void {
    this.isAdmin = !this.isAdmin;    // Toggle between admin view and default view
    this.router.navigate(['/dashboard']); // To route to User Dashboard
  }
}
