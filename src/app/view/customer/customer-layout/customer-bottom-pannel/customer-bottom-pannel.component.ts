import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-bottom-pannel',
  templateUrl: './customer-bottom-pannel.component.html',
  styleUrls: ['./customer-bottom-pannel.component.css']
})
export class CustomerBottomPannelComponent implements OnInit {
  @Input()pannelData:any;
  constructor() { }

  ngOnInit(): void {
  }

}
