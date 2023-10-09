import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lead-bulk-sort',
  templateUrl: './lead-bulk-sort.component.html',
  styleUrls: ['./lead-bulk-sort.component.css']
})
export class LeadBulkSortComponent implements OnInit {

  constructor() { }
  typesOfDate: string[] = ['Creation Date', 'Modification Date', 'Next Action Date', 'Re-enquiry Date'];
  ngOnInit(): void {
  }
  openNotification(){
    
  }
}
