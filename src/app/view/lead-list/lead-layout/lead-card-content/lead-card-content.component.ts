import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lead-card-content',
  templateUrl: './lead-card-content.component.html',
  styleUrls: ['./lead-card-content.component.css']
})
export class LeadCardContentComponent implements OnInit {
  expandPanel=false;
  notification: boolean =false;
  constructor() { }
  
  ngOnInit(): void {
  }
  openNotification(){
    this.notification = !this.notification
  }
}
