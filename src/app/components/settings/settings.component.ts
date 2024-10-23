import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  companyName: string = '';
  designation: string = '';
  userName: string = '';
  email: string = '';
firstName: any;
lastName: any;

  constructor(private userProfile: UserProfileService) {}

  ngOnInit(): void {

  this.initializeUserData();
}
private initializeUserData() {
  const userInfo = localStorage.getItem('userInfo'); 
  if (userInfo) {
    const parsedData = JSON.parse(userInfo); 
    this.companyName = parsedData.data.companyName;
    this.userName = parsedData.data.username;
    this.email = parsedData.data.email;
    this.firstName = parsedData.data.firstName;  
    this.lastName = parsedData.data.lastName;  
    this.designation = parsedData.data.designation; 

  } else {
    console.warn('No userInfo found in local storage.');
  }
}

    // initializeUserData()
    // {
    //   this.userProfile.getUserInfo().subscribe(data => {
    //     this.companyName = data.companyName;
    //     this.designation = data.designation;
    //     this.userName = data.userName;
    //     this.email = data.email;
    //   });
    // }
}


