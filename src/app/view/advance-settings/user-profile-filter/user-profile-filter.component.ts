import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile-filter',
  templateUrl: './user-profile-filter.component.html',
  styleUrls: ['./user-profile-filter.component.css']
})
export class UserProfileFilterComponent implements OnInit {
  filterForm!:FormGroup;

  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.filterForm = this._fb.group({
      role:[''],
      status:[''],
      designation:[''],
      reportingTo:[''],
      program:[''],
      department:[''],
      creationFrom:[''],
      creationTo:[''],
      loginFrom:[''],
      loginTo:[''],
      modificationFrom:[''],
      modificationTo:[''],

    })
  }
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}
