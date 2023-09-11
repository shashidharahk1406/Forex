import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-enterprise-template',
  templateUrl: './create-enterprise-template.component.html',
  styleUrls: ['./create-enterprise-template.component.css']
})
export class CreateEnterpriseTemplateComponent implements OnInit {

  message:any
  currentTime:any
  constructor() { }

  ngOnInit(): void {
    this.updateTime()
  }
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  private updateTime() {
    this.currentTime = new Date();
  }

}
