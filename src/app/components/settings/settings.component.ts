import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  companyName: string = '';
  designation: string = '';
  userName: string = '';
  email: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userData = this.userService.getUserData();
    this.companyName = userData.companyName;
    this.designation = userData.designation;
    this.userName = userData.userName;
    this.email = userData.email;
  }
}


