import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admission-details',
  templateUrl: './admission-details.component.html',
  styleUrls: ['./admission-details.component.css']
})
export class AdmissionDetailsComponent implements OnInit {
  admissionDetailsForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<AdmissionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.admissionDetailsForm = this.fb.group({
      applicationNumber:['',Validators.required],
      leadUpload:['',Validators.required]
    })
  }
  get f() {
    return this.admissionDetailsForm.controls;
  }
  onSubmit(){}
  closePopup(){
    this.dialogRef.close()
  }
  onFileSelected(event:any){}
}
