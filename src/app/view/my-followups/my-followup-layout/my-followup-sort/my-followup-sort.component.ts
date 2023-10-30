import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-followup-sort',
  templateUrl: './my-followup-sort.component.html',
  styleUrls: ['./my-followup-sort.component.css']
})
export class MyFollowupSortComponent implements OnInit {
  constructor() { }

  typesOfDate: string[] = ['Creation Date', 'Modification Date', 'Next Action Date', 'Re-enquiry Date'];
  ngOnInit(): void {
  }
  openNotification(){
    
  }

}
