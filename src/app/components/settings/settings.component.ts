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

  constructor(private userProfile: UserProfileService) {}

  ngOnInit(): void {

  this.initializeUserData();
}
    initializeUserData()
    {
      this.userProfile.getUserInfo().subscribe(data => {
        this.companyName = data.companyName;
        this.designation = data.designation;
        this.userName = data.userName;
        this.email = data.email;
      });
    }
}


