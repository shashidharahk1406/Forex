import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-whatsapp-chat-view-all',
  templateUrl: './whatsapp-chat-view-all.component.html',
  styleUrls: ['./whatsapp-chat-view-all.component.css']
})
export class WhatsappChatViewAllComponent implements OnInit {
  date = new Date();
  constructor(
    public dialogRef: MatDialogRef<WhatsappChatViewAllComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { }
  

    ngOnInit(): void {
    
    }

}
