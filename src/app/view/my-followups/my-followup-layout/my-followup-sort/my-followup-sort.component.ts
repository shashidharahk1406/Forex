import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FilterFollowUp } from 'src/app/filter/filter';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-my-followup-sort',
  templateUrl: './my-followup-sort.component.html',
  styleUrls: ['./my-followup-sort.component.css']
})
export class MyFollowupSortComponent implements OnInit {

  @Output()selectedSort:any = new EventEmitter()
  @ViewChild('dateType')dateType!:MatListModule
  constructor(private dataService:DataService) { }


  filterFollowUp = new FilterFollowUp();


  typesOfDate: any = ['Ascending','Descending','Creation Date', 'Modification Date','Next Action Date'];
  updateAPIURL:any = null;
  ngOnInit(): void {

    // this.updateAPIURL = this.dataService.getFollowupfilterURL()
    
  }


  selected: boolean = false;
  onChange(event:any){
    this.selected = true
    
    // this.dataService.setFilteredFollowUpURL(this.updateAPIURL)

    this.selectedSort.emit(event)
  }
  openNotification(){
    
  }

}
