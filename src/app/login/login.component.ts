import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import {  LoginPopupsComponent } from '../components/login-popups/login-popups.component';
import { RouterModule } from '@angular/router'; 
import { UserService  } from '../services/user.service'

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


  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService) {
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
        const token = response.data.token;
        if (token) {
          this.userService.saveToken(token);
          console.log('Token saved:',this.userService.getToken()); 
          //console.log('Navigating to dashboard...');
          this.userService.fetchUserInfo(token).subscribe({
            next: (response) =>{
              console.log("another subscriber");
               this.userService.setUserInfo(response);
               if(this.userService.getUserRole()==="ADMIN"){
                this.router.navigate(['admin-dashboard']);
              }
              else if(this.userService.getUserRole()==="MANAGER"){
                this.router.navigate(['dashboard']);
              }
              else if(this.userService.getUserRole()==="USER"){
                this.router.navigate(['user-dashboard']);
              }
              else{
                  this.userService.logout();
                  this.userService.removeUserInfo();
                  this.userService.removeToken();
              }
            },
            error:(error)=>{
               //popup for error 
               this.userService.logout();
               this.userService.removeUserInfo()
            }
          });
         
         
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




    /*
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        const token = response.data.token;
        if (token) {
          this.authService.saveToken(token);
          console.log('Token saved:', this.authService.getToken()); 
          console.log('Navigating to dashboard...');
          this.router.navigate(['dashboard']); 
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

*/
