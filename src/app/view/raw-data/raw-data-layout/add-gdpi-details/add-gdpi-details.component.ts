import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-gdpi-details',
  templateUrl: './add-gdpi-details.component.html',
  styleUrls: ['./add-gdpi-details.component.css']
})
export class AddGdpiDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  allDesignation:any=[
    {
      id:1,
      designation_name:'mmm'
    }
  ]

}
