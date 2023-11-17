import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-whatsapp-chat-call',
  templateUrl: './whatsapp-chat-call.component.html',
  styleUrls: ['./whatsapp-chat-call.component.css']
})
export class WhatsappChatCallComponent implements OnInit {
  callLeadForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<WhatsappChatCallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
  this.callLeadForm = this._fb.group({
    selection:[''],
    agree:['']
  })
  }

}
