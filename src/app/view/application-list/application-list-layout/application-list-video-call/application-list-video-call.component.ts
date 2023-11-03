import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-application-list-video-call',
  templateUrl: './application-list-video-call.component.html',
  styleUrls: ['./application-list-video-call.component.css']
})
export class ApplicationListVideoCallComponent implements OnInit {
  videoCallForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ApplicationListVideoCallComponent>,
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

