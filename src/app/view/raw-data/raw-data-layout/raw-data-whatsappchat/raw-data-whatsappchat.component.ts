import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-raw-data-whatsappchat',
  templateUrl: './raw-data-whatsappchat.component.html',
  styleUrls: ['./raw-data-whatsappchat.component.css']
})
export class RawDataWhatsappchatComponent implements OnInit {
  enterprise!:FormGroup;
  nonEnterprise!:FormGroup
  constructor(
    public dialogRef: MatDialogRef<RawDataWhatsappchatComponent>,
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
