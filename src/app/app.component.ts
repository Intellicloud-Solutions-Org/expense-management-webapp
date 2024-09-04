import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginPopupsComponent } from './components/login-popups/login-popups.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatSlideToggleModule,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    DashboardComponent,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    LoginComponent,
    LoginPopupsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Expenso';
}
