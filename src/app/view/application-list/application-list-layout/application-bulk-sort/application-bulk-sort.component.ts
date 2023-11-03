import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-bulk-sort',
  templateUrl: './application-bulk-sort.component.html',
  styleUrls: ['./application-bulk-sort.component.css']
})
export class ApplicationBulkSortComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  typesOfDate: string[] = ['Creation Date', 'Modification Date', 'Next Action Date', 'Re-enquiry Date'];
  openNotification(){
    
  }
}
