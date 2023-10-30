import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lead-bulk-sort',
  templateUrl: './lead-bulk-sort.component.html',
  styleUrls: ['./lead-bulk-sort.component.css']
})
export class LeadBulkSortComponent implements OnInit {
 @Output()selectedSort = new EventEmitter()
  constructor() { }
  typesOfDate: string[] = ['Ascending','Decending','Creation Date', 'Modification Date', 'Next Action Date', 'Re-enquiry Date'];
  ngOnInit(): void {}
  openNotification(){}
  onChange(event:any){
    this.selectedSort.emit(event)
  }
}
