import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notification: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }
  openNotification(){
    this.notification = !this.notification
  }
}
