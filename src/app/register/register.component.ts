import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import {  LoginPopupsComponent } from '../components/login-popups/login-popups.component';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginPopupsComponent, FormsModule, RouterModule  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

 // userRegisterObj: any = {
   // userName: '',
    //password: '',
   // emailId: '',
  //  companyname: '',
 // };

  showPopup: boolean = false;
  popupTitle: string = '';
  popupMessage: string = '';
  userRole: string | null = null; // role

  //authService = inject(AuthService);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(8)]],
      companyName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        this.passwordStrengthValidator
      ]],
    });
  }

  passwordStrengthValidator = (control: AbstractControl) => {
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

  onPopupClose() {
    this.showPopup = false;
  }
}
