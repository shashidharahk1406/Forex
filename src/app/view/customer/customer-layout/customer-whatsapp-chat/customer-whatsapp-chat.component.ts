import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-whatsapp-chat',
  templateUrl: './customer-whatsapp-chat.component.html',
  styleUrls: ['./customer-whatsapp-chat.component.css']
})
export class CustomerWhatsappChatComponent implements OnInit {

  enterprise!:FormGroup;
  nonEnterprise!:FormGroup
  constructor(
    public dialogRef: MatDialogRef<CustomerWhatsappChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { }
  

    ngOnInit(): void {
      this.initForm()
    }
    initForm(){
      this.enterprise = this._fb.group({
        contactNumber:['']
      })
      this.nonEnterprise = this._fb.group({
        contactNumber:[''],
        whatsappTemplate:[''],
        message:['']
      })

      }
      get f() {
        return this.nonEnterprise.controls;
      }
    
      clearSelectField(fieldName: string) {
        this.nonEnterprise.get(fieldName)?.reset();
      }
}
