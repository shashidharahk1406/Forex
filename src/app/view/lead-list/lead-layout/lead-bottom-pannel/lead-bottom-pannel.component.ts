import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lead-bottom-pannel',
  templateUrl: './lead-bottom-pannel.component.html',
  styleUrls: ['./lead-bottom-pannel.component.css']
})
export class LeadBottomPannelComponent implements OnInit {
 @Input()pannelData:any;
  constructor() { }

  ngOnInit(): void {
  }

}
