import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-raw-data-video-call',
  templateUrl: './raw-data-video-call.component.html',
  styleUrls: ['./raw-data-video-call.component.css']
})
export class RawDataVideoCallComponent implements OnInit {

  videoCallForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RawDataVideoCallComponent>,
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
