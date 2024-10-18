import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink, Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { AuthService } from '/Project/expense-management-webapp/src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NotifyService } from '/Project/expense-management-webapp/src/app/services/notify.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, MatDividerModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  notifications: any[] = [];

  constructor(private authService: AuthService, private notifyService: NotifyService, private router: Router) { }

  onLogout(): void {
    this.router.navigate(['/login']); 
  }
  
  ngOnInit(): void {

    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notifyService.getNotifications().subscribe(data => {
      this.notifications = data;
    });
  }
  }

