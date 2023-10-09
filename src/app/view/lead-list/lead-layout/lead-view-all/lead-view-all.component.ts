import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeadWhatsappChatComponent } from '../lead-whatsapp-chat/lead-whatsapp-chat.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lead-view-all',
  templateUrl: './lead-view-all.component.html',
  styleUrls: ['./lead-view-all.component.css']
})
export class LeadViewAllComponent implements OnInit {
  date = new Date();
  constructor(
    public dialogRef: MatDialogRef<LeadWhatsappChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { }
  

    ngOnInit(): void {
    
    }
    
    

}
