import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-popups',
  standalone: true,
  imports: [],
  templateUrl: './login-popups.component.html',
  styleUrl: './login-popups.component.css'
})
export class LoginPopupsComponent {

  @Input() title: string = '';
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

}
