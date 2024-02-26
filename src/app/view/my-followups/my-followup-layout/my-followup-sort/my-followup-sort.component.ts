import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-my-followup-sort',
  templateUrl: './my-followup-sort.component.html',
  styleUrls: ['./my-followup-sort.component.css']
})
export class MyFollowupSortComponent implements OnInit {

  @Output()selectedSort:any = new EventEmitter()
  @ViewChild('dateType')dateType!:MatListModule
  constructor() { }

  typesOfDate: any = ['Ascending','Descending','Creation Date', 'Modification Date','Next Action Date'];
  ngOnInit(): void {
  }


  selected: boolean = false;
  onChange(event:any){
    this.selected = true
    this.selectedSort.emit(event)
    // //console.log(value[0]?._value,"valueeeee")
    
    // //console.log(this.dateType)
  }
  openNotification(){
    
  }

}
