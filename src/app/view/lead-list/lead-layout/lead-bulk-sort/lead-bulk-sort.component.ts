import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-lead-bulk-sort',
  templateUrl: './lead-bulk-sort.component.html',
  styleUrls: ['./lead-bulk-sort.component.css']
})
export class LeadBulkSortComponent implements OnInit {
 @Output()selectedSort:any = new EventEmitter()
 @ViewChild('dateType')dateType!:MatListModule
  selected: boolean = false;
  constructor() { }
  typesOfDate: string[] = ['Ascending','Descending','Creation Date'];
  ngOnInit(): void {}
 
  onChange(event:any){
    this.selected = true
    this.selectedSort.emit(event)
    
    //console.log(this.dateType)
  }
}
