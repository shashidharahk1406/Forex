import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-task-layout',
  templateUrl: './upcoming-task-layout.component.html',
  styleUrls: ['./upcoming-task-layout.component.css']
})
export class UpcomingTaskLayoutComponent implements OnInit {
  allCounselor:any=[
    {
      id:1,name:"rohith"
    },
    {
      id:1,name:"rohith"
    },
    {
      id:1,name:"rohith"
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
