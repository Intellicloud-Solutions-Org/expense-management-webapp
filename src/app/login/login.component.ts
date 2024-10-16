import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import {  LoginPopupsComponent } from '../components/login-popups/login-popups.component';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoginPopupsComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm: FormGroup;

  showPopup: boolean = false;
  popupTitle: string = '';
  popupMessage: string = '';
  router = inject(Router);
  userRole: string | null = null; // role

  //authService = inject(AuthService);

  constructor(private fb: FormBuilder, private authService: AuthService) {
      this.loginForm = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
  }

  onLogin() {
    const formValues = this.loginForm.value;
    
  
    const dummyUsers = [
      { userName: 'admin', password: 'Admin123!', role: 'Admin' },
      { userName: 'manager', password: 'Manager123!', role: 'Manager' },
      { userName: 'user', password: 'User123!', role: 'User' },
      { userName: 'kritika', password: 'Kri123!', role: 'User'}
    ];

    const matchedUser = dummyUsers.find(user => 
      user.userName === formValues.userName && user.password === formValues.password
    );

    if (matchedUser) {
      
      localStorage.setItem('authToken', 'dummy-jwt-token');
      localStorage.setItem('userRole', matchedUser.role);
      this.userRole = matchedUser.role;
      this.authService.setUserRole(matchedUser.role);

      this.router.navigate(['/dashboard']);
    } else {
      this.popupTitle = 'Login Failed';
      this.popupMessage = 'Username or password is incorrect';
      this.showPopup = true;
    }
  }

  onPopupClose() {
    this.showPopup = false;
  }
}
