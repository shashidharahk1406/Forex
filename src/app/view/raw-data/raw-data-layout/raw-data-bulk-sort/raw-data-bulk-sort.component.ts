import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raw-data-bulk-sort',
  templateUrl: './raw-data-bulk-sort.component.html',
  styleUrls: ['./raw-data-bulk-sort.component.css']
})
export class RawDataBulkSortComponent implements OnInit {

  constructor() { }

  typesOfDate: string[] = ['Creation Date', 'Modification Date', 'Next Action Date', 'Re-enquiry Date'];
  ngOnInit(): void {
  }
  openNotification(){
    
  }

}
