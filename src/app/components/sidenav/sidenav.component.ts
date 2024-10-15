import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '/Project/expense-management-webapp/src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterLink, MatSidenavModule, RouterOutlet, CommonModule ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent  {

  isExpanded = true; 
  userRole: string | null = null; // Store user role
  

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    
    this.userRole = this.authService.getUserRole();
  }
  
  toggleSidebar() : void {
    this.isExpanded = !this.isExpanded;
  }

}