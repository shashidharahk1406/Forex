import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-non-enterprise-template',
  templateUrl: './create-non-enterprise-template.component.html',
  styleUrls: ['./create-non-enterprise-template.component.css']
})
export class CreateNonEnterpriseTemplateComponent implements OnInit {
  message:any
  constructor() { }

  ngOnInit(): void {
  }
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

}
