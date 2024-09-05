import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

    dummyNotifications = [
    { title: 'New message from John' },
    { title: 'Server downtime scheduled for tonight' },
    { title: 'Project deadline approaching' }
  ];

  constructor() { }

  getNotifications(): Observable<any[]> {
    return of(this.dummyNotifications);
  }
}
