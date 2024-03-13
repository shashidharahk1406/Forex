import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FollowupWhatsappchatComponent } from '../followup-whatsappchat/followup-whatsappchat.component';

@Component({
  selector: 'app-followup-videocall',
  templateUrl: './followup-videocall.component.html',
  styleUrls: ['./followup-videocall.component.css']
})
export class FollowupVideocallComponent implements OnInit {

  followUpvideoCallForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<FollowupVideocallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) {
      
     }
  

    ngOnInit(): void {
      console.log(this.data,"followup-videocall")
      this.initForm()
    }
    initForm(){
      this.followUpvideoCallForm = this._fb.group({
        email:[''],
        sms:[''],
        whatsapp:['']
      })
    }

}
