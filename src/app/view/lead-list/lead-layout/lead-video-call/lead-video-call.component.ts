import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeadWhatsappChatComponent } from '../lead-whatsapp-chat/lead-whatsapp-chat.component';

@Component({
  selector: 'app-lead-video-call',
  templateUrl: './lead-video-call.component.html',
  styleUrls: ['./lead-video-call.component.css']
})
export class LeadVideoCallComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LeadWhatsappChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { }
  

    ngOnInit(): void {
      this.initForm()
    }
    initForm(){}
    
}
