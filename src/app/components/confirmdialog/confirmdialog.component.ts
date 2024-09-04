import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmdialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmdialog.component.html',
  styleUrl: './confirmdialog.component.css'
})
export class ConfirmdialogComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  isVisible: boolean = false;

  @Output() confirmed = new EventEmitter<void>();

  showConfirmation(title: string, message: string): void {
    this.title = title;
    this.message = message;
    this.isVisible = true;
  }


  confirm(): void {
    this.isVisible = false;
  }

  closeDialog(): void {
    this.isVisible = false;
  }
}