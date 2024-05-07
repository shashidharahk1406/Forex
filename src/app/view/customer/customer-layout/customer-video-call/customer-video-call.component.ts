import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerWhatsappChatComponent } from '../customer-whatsapp-chat/customer-whatsapp-chat.component';

@Component({
  selector: 'app-customer-video-call',
  templateUrl: './customer-video-call.component.html',
  styleUrls: ['./customer-video-call.component.css']
})
export class CustomerVideoCallComponent implements OnInit {

  videoCallForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CustomerWhatsappChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { }
  

    ngOnInit(): void {
      this.initForm()
    }
    initForm(){
      this.videoCallForm = this._fb.group({
        email:[''],
        sms:[''],
        whatsapp:['']
      })
    }
    

}
