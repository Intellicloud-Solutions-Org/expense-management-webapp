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
 //userRole: string | null = null; 


  constructor(private fb: FormBuilder, private authService: AuthService) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }

    //ngOnInit() {
     // this.userRole = localStorage.getItem('userRole');
   // }

  onLogin() {
    if (this.loginForm.invalid) {
      this.showPopup = true;
      this.popupTitle = 'Error';
      this.popupMessage = 'Please fill in all fields';
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        const token = response.token;
        if (token) {
          this.authService.saveToken(token);
          console.log('Token saved:', this.authService.getToken()); 
          this.router.navigate(['/dashboard']); 
        } else {
          this.showPopup = true;
          this.popupTitle = 'Login Failed';
          this.popupMessage = 'No token received';
        }
      },
      error: (err) => {
        this.showPopup = true;
        this.popupTitle = 'Login Failed';
        this.popupMessage = 'Invalid username or password';
      },
    });
  }

   onPopupClose() {
    this.showPopup = false;
  }
}


//logout() {
  //localStorage.removeItem('jwtToken');
  //this.router.navigate(['/login']);  // Optional: Redirect user to login page
//}