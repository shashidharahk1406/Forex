import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-country-id',
  templateUrl: './edit-country-id.component.html',
  styleUrls: ['./edit-country-id.component.css']
})
export class EditCountryIdComponent implements OnInit {

  addUserForm!:FormGroup;

  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.addUserForm = this._fb.group({
      firstName:['',[Validators.required]],
      lastName:[''],
      email:['',[Validators.required]],
      mobile:[''],
      key:[''],
      target:[''],
      startDate:[''],
      designation:['',[Validators.required]],
      role:['',[Validators.required]],
      reportingTo:['',[Validators.required]],
      allow:[''],
      program:['',[Validators.required]],
      department:['']

    })
  }
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}

