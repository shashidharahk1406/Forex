import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-enterprise-template',
  templateUrl: './create-enterprise-template.component.html',
  styleUrls: ['./create-enterprise-template.component.css']
})
export class CreateEnterpriseTemplateComponent implements OnInit {
  addForm!:FormGroup;
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
   
  editorConfig = {
    toolbarGroups: [
      { name: 'basicstyles' },
      { name: 'insert' },
    ],
    removeButtons: 'Underline,Subscript,Superscript,Anchor,Image,Table,Smiley,PageBreak,Iframe, HorizontalRule',
    extraPlugins: 'emoji',
    height: '150px',
  };

  submit(){
    console.log("==Message==",this.message)
  }
}
