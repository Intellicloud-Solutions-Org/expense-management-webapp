import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import {  LoginPopupsComponent } from '../components/login-popups/login-popups.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoginPopupsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  isLoginView: boolean = true;
  userRegisterObj: any = {
    userName: '',
    password: '',
    emailId: '',
    companyname: '',
  };
  userLogin: any = {
    userName: '',
    password: '',
  };

  showPopup: boolean = false;
  popupTitle: string = '';
  popupMessage: string = '';
  router = inject(Router);
  userRole: string | null = null; // role

  authService = inject(AuthService);

  constructor() {
    this.userForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
      ]),
      companyname: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        this.passwordStrengthValidator,
      ]),
    });
  }

  passwordStrengthValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecial = /[\W_]+/.test(value);

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
    if (!passwordValid) {
      return { passwordStrength: true };
    }
    return null;
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
  }

  // Mock registration
  onRegister() {
    this.popupTitle = 'Registration Success';
    this.popupMessage = 'Registration Successful';
    this.showPopup = true;

    // Store the user role (for demo purposes)
    localStorage.setItem('userRole', 'User');
  }

  onLogin() {
    const formValues = this.userForm.value;
    
  
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
