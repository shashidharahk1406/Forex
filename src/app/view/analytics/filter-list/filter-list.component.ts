import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
 filterType = ['All','Invalid','Active']
 seletedType:any = 'Select Type'
  ngOnInit(): void {
   
  }
  getType(items:any){
    this.seletedType = items
  }
  
}
