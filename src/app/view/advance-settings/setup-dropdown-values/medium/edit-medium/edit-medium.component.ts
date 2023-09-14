import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-medium',
  templateUrl: './edit-medium.component.html',
  styleUrls: ['./edit-medium.component.css']
})
export class EditMediumComponent implements OnInit {

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
